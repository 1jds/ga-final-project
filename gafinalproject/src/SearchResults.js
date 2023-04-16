import { useState } from "react";
import { useOutletContext } from "react-router";
import PoemDetail from "./PoemDetail";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function SearchResults(props) {
  const contextProps = useOutletContext();
  console.log("Context Props Equals...", contextProps);
  const numberOfResultsPages = Math.ceil(contextProps.length / 20);
  let resultsList = [];
  if (contextProps[0].msg) {
    resultsList = [contextProps[0].msg];
  } else {
    resultsList = contextProps.map(({ author, title }, index) => {
      return (
        <button
          key={`${author.slice(0,3)}${title.slice(0,3)}${index}`}
          onClick={() => handleSelect(index)}
          className="search-results--list--button"
          title="read poem"
          aria-label="display details of this poem"
        >
          <span>
            <strong>{author}</strong>
          </span>
          <span>{title.length < 50 ? title : `${title.slice(0, 50)}...`}</span>
        </button>
      );
    });
  }
  const [selectedPoemDetails, setSelectedPoemDetails] = useState();

  const handleSelect = (index) => {
    let poemSelected = contextProps[index];
    setSelectedPoemDetails(poemSelected);
  };

  const [currentPageofResults, setCurrentPageofResults] = useState(1);
  const lastIndex = currentPageofResults * 20;
  const firstIndex = lastIndex - 20;

  console.log("results list just before render", resultsList);

  return (
    <>
      <div className="search-results--container">
        <div>
          <p>Search Results</p>
          {/* <p>
            <strong>TITLE: {props.title}</strong>
          </p>
          <p>AUTHOR: {props.author}</p>
          <p>LINES: {props.lines}</p> */}
          <div className="search-results--back-and-forward-btns-container">
            <button
              onClick={() =>
                setCurrentPageofResults((prevState) => {
                  return prevState === 1 ? 1 : prevState - 1;
                })
              }
            >
              <ChevronLeftIcon />
            </button>
            <p>
              Page {currentPageofResults} of {numberOfResultsPages}
            </p>
            <button
              onClick={() =>
                setCurrentPageofResults((prevState) => {
                  return prevState === numberOfResultsPages
                    ? prevState
                    : prevState + 1;
                })
              }
            >
              <ChevronRightIcon />
            </button>
          </div>
          {/* {contextProps ? (
            <pre>{JSON.stringify(contextProps, null, 2)}</pre>
          ) : (
            <></>
          )} */}
          {resultsList.slice(firstIndex, lastIndex)}
        </div>
        <div>
          <p>Poem Details</p>
          {selectedPoemDetails ? (
            <PoemDetail selectedPoemDetails={selectedPoemDetails} />
          ) : (
            <p>No poem selected...</p>
          )}
        </div>
      </div>
    </>
  );
}
