import { useState } from "react";

export default function RhymingHelp(props) {
  const [wordToRhyme, setWordToRhyme] = useState("");
  const [textInput, setTextInput] = useState("");

  var rhymes = require("rhymes");
  // console.log("rhymes:", rhymes("cat"));

  let newRhymesList = rhymes(wordToRhyme);
  let rhymingWordsList = newRhymesList.map((item, index) => {
    return <li key={`${item}${index}`}>{item.word}</li>;
  });

  const handleRhymeWordSearch = (e) => {
    e.preventDefault();
    setWordToRhyme(textInput);
  };

  return (
    <div style={{ border: "2px solid gainsboro", borderRadius: '4px', padding: "1rem" }}>
      <p>Need help finding rhymes?</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          onChange={(e) => setTextInput(e.target.value)}
          type="text"
          id="wordToRhyme"
          value={textInput}
        ></input>
        <button onClick={handleRhymeWordSearch}>Search</button>
      </div>
      <ul
        style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
      >
        {rhymingWordsList}
      </ul>
    </div>
  );
}

// Rhyming dictionary dependency created by Zeke Sikelianos
