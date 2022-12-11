import "./Title.scss";

const Title = (props: { text: string; isMargin?: boolean }) => {
  return (
    <h2
      className="title"
      style={!props.isMargin ? { margin: 0 } : { marginBottom: "25px" }}
    >
      {props.text}
    </h2>
  );
};

export default Title;
