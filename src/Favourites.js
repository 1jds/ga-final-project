import { useContext, useState } from "react";
import { FavesContext } from "./Poems";
import PoemDetail from "./PoemDetail";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { useOutletContext } from "react-router";
import flowersPlaceholderLightMode from "./assets/flowers_placeholder_light_theme.svg";
import flowersPlaceholderDarkMode from "./assets/flowers_placeholder_dark_theme.svg";

export default function Favourites() {
  const outletContextProps = useOutletContext();
  const { favesList, handleFavourited } = useContext(FavesContext);
  let favouritesList = [];
  if (favesList.length === 0) {
    favouritesList =
      "No favourites added yet. Use the search bar above to find poems that you can add to your favourites list.";
  } else {
    favouritesList = favesList.map(
      ({ author, linecount, lines, title }, index) => {
        return (
          <div className="favourites-page--favourites-item-container">
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
                setSelectedPoemDetails(null);
              }}
              title="remove poem from favourites"
              aria-label="remove this poem from favourites"
            >
              <IndeterminateCheckBoxOutlinedIcon
                className={
                  outletContextProps.isDarkMode
                    ? "favourites-page--material-icons favourites-page--material-icons-dark-mode"
                    : "favourites-page--material-icons"
                }
              />
            </button>
          </div>
        );
      }
    );
  }

  const [selectedPoemDetails, setSelectedPoemDetails] = useState(null);
  const handleSelect = (index) => {
    let poemSelected = favesList[index];
    setSelectedPoemDetails(poemSelected);
  };

  const clearSelectedPoemDetails = () => {
    setSelectedPoemDetails(null);
  };

  return (
    <>
      <div className="favourites-page--container">
        <div className="favourites-page--favourites-list-container">
          <h2 className="outlet-page--main-h2-heading">
            Your Saved Favourite Poems
          </h2>
          {favouritesList}
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
                alt="background flower placeholder"
                style={{ maxWidth: "300px" }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
