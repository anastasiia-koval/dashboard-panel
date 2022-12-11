import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button/Button";
import Form from "react-bootstrap/Form";
import { UserDataProps } from "../../globalInterfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUserData, addUser } from "../../redux/slices/userSlice";
import "./UserForm.scss";

type UserFormValues = {
  name: string;
  userName: string;
  city: string;
  email: string;
};

interface UserFormProps {
  isEditable: boolean;
  userData: UserDataProps | undefined;
}

const UserForm = (props: UserFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: props.userData?.name,
      userName: props.userData?.username,
      city: props.userData?.address.city,
      email: props.userData?.email,
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    //Update isn't working for new created users through API. API returned an error 404.
    /* So I decided not to depend on axios call (not to wright down to own state the result from API), 
       so all CRUD logic is done outside axios 
   */

    const sentData = {
      name: data.name,
      address: {
        city: data.city,
      },
      email: data.email,
      username: data.userName,
      id: props.userData?.id,
    };
    if (props.isEditable) {
      axios
        .put(
          `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${props.userData?.id}`,
          {
            ...props.userData,
            sentData,
          }
        )
        .then((res) => {});
      dispatch(updateUserData(sentData));
    } else {
      axios
        .post(
          `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`,
          {
            sentData,
          }
        )
        .then((res) => {});
      dispatch(addUser(sentData));
    }
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <Form.Group>
        <Form.Label>Name *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name*"
          {...register("name", {
            required: "Name field is required",
            maxLength: {
              value: 30,
              message: "The name is too long, the max length is 30 characters",
            },
          })}
        />
        {errors.name && (
          <Form.Text className="text-danger">{errors.name.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Email *</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email*"
          {...register("email", {
            required: "Email field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          {...register("userName", {
            minLength: {
              value: 2,
              message: "The username should contain minimum 3 characters",
            },
            maxLength: {
              value: 30,
              message: "The name is too long, the max length is 30 characters",
            },
          })}
        />
        {errors.userName && (
          <Form.Text className="text-danger">
            {errors.userName.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="City"
          {...register("city", {
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "The city field should contain of letters",
            },
          })}
        />
        {errors.city && (
          <Form.Text className="text-danger">{errors.city.message}</Form.Text>
        )}
      </Form.Group>
      <div className="buttons-container">
        <Button
          text="Cancel"
          variant="outline-danger"
          onClick={() => navigate("/")}
        />
        <Button
          text="Submit"
          variant="primary"
          isSubmit
          disabled={!isValid || !isDirty}
        />
      </div>
    </Form>
  );
};

export default UserForm;
