import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getAllUsers: (state, action) => {
      return action.payload;
    },
    updateUserData: (state, action) => {
      const { name, email, username, address, id } = action.payload;

      const updatedData = state.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            name: name,
            email: email,
            username: username,
            address: { city: address.city },
          };
        }
        return user;
      });
      return updatedData;
    },
    addUser: (state, action) => {
      const { name, email, username, address } = action.payload;
      const newUserId =
        state.length === 0 ? 1 : Math.max(...state.map((user) => user.id)) + 1;

      return [
        ...state,
        {
          name: name,
          email: email,
          username: username,
          address: { city: address.city },
          id: newUserId,
        },
      ];
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
  },
});
export const { updateUserData, addUser, getAllUsers, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
