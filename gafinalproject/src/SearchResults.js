import { useState } from "react";
import { useOutletContext } from "react-router";
import PoemDetail from "./PoemDetail";

export default function SearchResults(props) {
  const contextProps = useOutletContext();
  const numberOfResultsPages = Math.ceil(contextProps.length / 20);
  const resultsList = contextProps.map(({ author, title }, index) => {
    return (
      <button
        onClick={() => handleSelect(index)}
        className="search-results--list--button"
        title="read poem"
        aria-label="display details of this poem"
      >
        <span>
          <strong>{author}</strong>
        </span>
        <span>{title.length < 45 ? title : `${title.slice(0, 45)}...`}</span>
      </button>
    );
  });
  const [selectedPoemDetails, setSelectedPoemDetails] = useState();

  const handleSelect = (index) => {
    let poemSelected = contextProps[index];
    setSelectedPoemDetails(poemSelected)
  }

  const [currentPageofResults, setCurrentPageofResults] = useState(1);
  const lastIndex = currentPageofResults * 20;
  const firstIndex = lastIndex - 20;


  return (
    <>
      <div className="search-results--container">
        <div>
          <h2>First DIV</h2>
          {/* <p>
            <strong>TITLE: {props.title}</strong>
          </p>
          <p>AUTHOR: {props.author}</p>
          <p>LINES: {props.lines}</p> */}
          <button onClick={() => setCurrentPageofResults(prevState => {return prevState === 1 ? 1 : prevState - 1})}>Back</button>
          <p>Page {currentPageofResults} of {numberOfResultsPages}</p>
          <button onClick={() => setCurrentPageofResults(prevState => {return prevState === numberOfResultsPages ? prevState : prevState + 1})}>Forward</button>
          {/* {contextProps ? (
            <pre>{JSON.stringify(contextProps, null, 2)}</pre>
          ) : (
            <></>
          )} */}
          {resultsList.slice(firstIndex,lastIndex)}
        </div>
        <div>
          <h2>Second DIV</h2>
          {
            selectedPoemDetails ? <PoemDetail selectedPoemDetails={selectedPoemDetails} /> : <p>No poem selected...</p>
          }
        </div>
      </div>
    </>
  );
}
