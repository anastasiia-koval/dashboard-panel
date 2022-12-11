import { Button as BootstrapButton } from "react-bootstrap";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  variant: "warning" | "danger" | "primary" | "outline-danger" | "success";
  isSubmit?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <BootstrapButton
      variant={props.variant}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.isSubmit ? "submit" : undefined}
    >
      {props.text}
    </BootstrapButton>
  );
};

export default Button;
