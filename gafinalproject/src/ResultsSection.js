export default function ResultsSection(props) {
  return (
    <div>
      <p>
        <strong>TITLE: {props.title}</strong>
      </p>
      <p>AUTHOR: {props.author}</p>
      <p>LINES: {props.lines}</p>
    </div>
  );
}
