import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import "./Dashboard.scss";
import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, deleteUser } from "../../redux/slices/userSlice";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const Dashboard = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUserId, setSelectedUSerId] = useState<number>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.users);

  const deleteUserData = () => {
    axios
      .delete(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${selectedUserId}`
      )
      .then((res) => {});
    dispatch(deleteUser(selectedUserId));
    setShowModal(false);
  };

  useEffect(() => {
    if (reduxData.length <= 0) {
      setIsLoading(true);
      axios
        .get(
          "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
        )
        .then((res) => {
          setIsLoading(false);
          dispatch(getAllUsers(res.data));
        });
    }
  }, []);
  if (isLoading) {
    return <Spinner animation="border" />;
  } else {
    return (
      <div className="dashboard-container">
        <div className="table-header">
          <Title text="User List" isMargin={false} />
          <Button
            text="Add user"
            variant="primary"
            onClick={() => {
              navigate("/addUser");
            }}
          />
        </div>
        <div className="table-container">
          <Table
            userData={reduxData}
            handleDelete={(id) => {
              setShowModal(true);
              setSelectedUSerId(id);
            }}
          />
        </div>

        <ConfirmationModal
          show={showModal}
          title="Are you sure, that you want to delete user?"
          primaryButtonText="Yes"
          secondaryButtonText="No"
          handleClose={() => setShowModal(false)}
          handleConfirm={deleteUserData}
        />
      </div>
    );
  }
};

export default Dashboard;
