import Form from "react-bootstrap/Form";
interface InputProps {
  label: string;
  placeholder: string;
  type: "string" | "number";
  helperText: string;
  name: string;
}
const Input = (props: InputProps) => {
  return (
    <div>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        id={`input-${props.name}`}
        aria-describedby="passwordHelpBlock"
      />
      <Form.Text id={`helper-${props.name}`} muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
    </div>
  );
};
