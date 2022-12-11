import { useParams, useLocation } from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";
import Spinner from "react-bootstrap/Spinner";
import "./FormPage.scss";
import Title from "../../components/Title/Title";

const FormPage = () => {
  let { userId } = useParams();
  const { state } = useLocation();

  if (userId && !state) {
    return <Spinner animation="border" />;
  }
  return (
    <div className="form-page-container">
      <Title text={userId ? "Edit User" : "Add New User"} isMargin />
      <UserForm
        isEditable={!userId ? false : true}
        userData={userId ? state : undefined}
      />
    </div>
  );
};

export default FormPage;
