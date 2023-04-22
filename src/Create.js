import RhymingHelp from "./RhymingHelp";
import { useState } from "react";

export default function Create() {
  const [inputText, setInputText] = useState("");

  const handleSaveToCookie = () => {
    document.cookie = `userPoemText = ${inputText}; expires=${new Date(
      2023,
      11,
      1
    ).toUTCString()}`;
  };

  const handleRetrieveFromCookie = (name) =>
    `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift();

  return (
    <div className="create-page--container">
      <h2 className="outlet-page--main-h2-heading">Compose Your Own Poem</h2>
      <div className="create-page--two-parts-flex-container">
        <div className="create-page--user-compose-poem-container">
          <textarea
            className="create-page--user-poem-text-input"
            onChange={(e) => setInputText(e.target.value)}
            placeholder="I wandered lonely as a cloud..."
            value={inputText}
          />
          <button
            className="create-page--save-user-poem-btn"
            onClick={handleSaveToCookie}
          >
            Save Draft
          </button>
          <button
            className="create-page--save-user-poem-btn"
            onClick={(e) =>
              setInputText(handleRetrieveFromCookie("userPoemText"))
            }
          >
            Restore Draft
          </button>
        </div>
        <RhymingHelp />
      </div>
    </div>
  );
}
