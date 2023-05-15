import { useState, useContext, useEffect } from "react";
import { FavesContext } from "./Poems";
import { useOutletContext } from "react-router";
import PoemDetail from "./PoemDetail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import flowersPlaceholderLightMode from "./assets/flowers_placeholder_light_theme.svg";
import flowersPlaceholderDarkMode from "./assets/flowers_placeholder_dark_theme.svg";

export default function SearchResults(props) {
  // console.log(props)
  const { favesList, handleFavourited } = useContext(FavesContext);
  const outletContextProps = useOutletContext();
  const numberOfResultsPages = Math.ceil(
    outletContextProps.APIresponse.length / 20
  );
  let resultsList = [];
  if (outletContextProps.APIresponse[0].msg) {
    resultsList = [outletContextProps.APIresponse[0].msg];
  } else {
    resultsList = outletContextProps.APIresponse.map(
      ({ author, title, linecount, lines }, index) => {
        const isThisItemInFaves = favesList.some(
          (element) => element.title === title
        );

        return (
          <div
            key={`${author}${lines}${index}`}
            className="favourites-page--favourites-item-container"
          >
            <span className="favourites-page--favourites-list-item">
              <strong>{author}</strong>
            </span>
            <span className="favourites-page--favourites-list-item">
              {title.length < 35 ? title : `${title.slice(0, 35)}...`}
            </span>
            <button
              className="favourites-page--favourites-list-item-btn"
              key={`${author.slice(0, 3)}${title.slice(0, 3)}${index}`}
              onClick={() => handleSelect(index)}
              title="read poem"
              aria-label="display details of this poem"
            >
              <OpenInNewIcon
                className={
                  outletContextProps.isDarkMode
                    ? "favourites-page--material-icons favourites-page--material-icons-dark-mode"
                    : "favourites-page--material-icons"
                }
              />
            </button>
            <button
              className="favourites-page--favourites-list-item-btn"
              onClick={() => {
                handleFavourited({ author, linecount, lines, title });
              }}
              title="add poem to favourites"
              aria-label="add this poem to your favourites"
            >
              {isThisItemInFaves ? (
                <IndeterminateCheckBoxOutlinedIcon
                  className={
                    outletContextProps.isDarkMode
                      ? "favourites-page--material-icons favourites-page--material-icons-dark-mode"
                      : "favourites-page--material-icons"
                  }
                />
              ) : (
                <AddBoxOutlinedIcon
                  className={
                    outletContextProps.isDarkMode
                      ? "favourites-page--material-icons favourites-page--material-icons-dark-mode"
                      : "favourites-page--material-icons"
                  }
                />
              )}
            </button>
          </div>
        );
      }
    );
  }
  const [selectedPoemDetails, setSelectedPoemDetails] = useState();

  const handleSelect = (index) => {
    let poemSelected = outletContextProps.APIresponse[index];
    setSelectedPoemDetails(poemSelected);
  };

  const [currentPageofResults, setCurrentPageofResults] = useState(1);
  const lastIndex = currentPageofResults * 20;
  const firstIndex = lastIndex - 20;
  useEffect(() => {
    // console.log("Context Props Equals...", outletContextProps);
    setCurrentPageofResults(1)
  }, [outletContextProps.APIresponse])
  // console.log("results list just before render", resultsList);

  const clearSelectedPoemDetails = () => {};

  return (
    <>
      <div className="search-results--container">
        <div>
          <div className="favourites-page--favourites-list-container">
            <h2 className="outlet-page--main-h2-heading">Search Results</h2>
            {outletContextProps.error ? (
              <p>
                An error has occured. Please try again.{" "}
                {outletContextProps.error}
              </p>
            ) : outletContextProps.loading ? (
              <p>Results loading. Please wait...</p>
            ) : (
              resultsList.slice(firstIndex, lastIndex)
            )}
          </div>
          <div className="search-results--back-and-forward-btns-container">
            <button
              aria-label="move back one page of results"
              onClick={() =>
                setCurrentPageofResults((prevState) => {
                  return prevState === 1 ? 1 : prevState - 1;
                })
              }
            >
              <ChevronLeftIcon
                className={
                  outletContextProps.isDarkMode
                    ? "search-results--back-and-forward-btns-dark-theme"
                    : ""
                }
              />
            </button>
            <p>
              Page {currentPageofResults} of {numberOfResultsPages}
            </p>
            <button
              aria-label="move forward one page of results"
              onClick={() =>
                setCurrentPageofResults((prevState) => {
                  return prevState === numberOfResultsPages
                    ? prevState
                    : prevState + 1;
                })
              }
            >
              <ChevronRightIcon
                className={
                  outletContextProps.isDarkMode
                    ? "search-results--back-and-forward-btns-dark-theme"
                    : ""
                }
              />
            </button>
          </div>
        </div>
        <div>
          {selectedPoemDetails ? (
            <PoemDetail
              clearSelectedPoemDetails={clearSelectedPoemDetails}
              selectedPoemDetails={selectedPoemDetails}
              displayImg={true}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="details-component-placeholder-text">
                Select a poem to view more information...
              </p>
              <img
                src={
                  outletContextProps.isDarkMode
                    ? flowersPlaceholderDarkMode
                    : flowersPlaceholderLightMode
                }
                alt="flower background placeholder"
                style={{ maxWidth: "300px" }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
