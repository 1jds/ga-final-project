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
    setWordToRhyme(textInput);
  };

  return (
    <div className="rhyming-help-component--container">
      <p className="rhyming-help-component--heading">Rhyme Finder!</p>
      <div className="rhyming-help-component--input-area">
        <input
          onChange={(e) => setTextInput(e.target.value)}
          type="text"
          id="wordToRhyme"
          value={textInput}
          placeholder="Find a rhyme for that word"
          onKeyDown={(e) => {
            e.key === "Enter" && handleRhymeWordSearch();
          }}
        ></input>
        <button onClick={handleRhymeWordSearch}>Search</button>
      </div>
      <ul className="rhyming-help-component--words-list">{rhymingWordsList}</ul>
    </div>
  );
}

// Rhyming dictionary dependency created by Zeke Sikelianos
