import Modal from "react-bootstrap/Modal";
import Button from "../Button/Button";
import "./ConfirmationModal.scss";

interface ConfirmationModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}
const ConfirmationModal = (props: ConfirmationModalProps) => {
  return (
    <Modal show={props.show} className="modal-container">
      <Modal.Body>
        <Modal.Title className="modal-title">{props.title}</Modal.Title>
      </Modal.Body>
      <Modal.Footer className="buttons-container">
        <Button
          variant="outline-danger"
          onClick={props.handleClose}
          text={props.secondaryButtonText}
        />
        <Button
          variant="success"
          onClick={props.handleConfirm}
          text={props.primaryButtonText}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmationModal;
