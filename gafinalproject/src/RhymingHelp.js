// Rhyming dictionary dependency created by Zeke Sikelianos

export default function RhymingHelp(props) {
  var rhymes = require("rhymes");
  console.log("rhymes:", rhymes("cat"));

  let newRhymesList = rhymes(props.wordToRhyme);
  let rhymingWordsList = newRhymesList.map((item, index) => {
    return <li key={`${item}${index}`}>{item.word}</li>;
  });
  return (
    <div style={{ border: "3px solid red" }}>
      <p>Rhyming Help Component</p>
      <ul>{rhymingWordsList}</ul>
    </div>
  );
}
