import { useContext, useState } from "react";
import { FavesContext } from "./Poems";
import PoemDetail from "./PoemDetail";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { useOutletContext } from "react-router";

export default function Favourites() {
  const outletContextProps = useOutletContext();
  const { favesList, handleFavourited } = useContext(FavesContext);
  let favouritesList = [];
  if (favesList.length === 0) {
    favouritesList = "No favourites added yet";
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
              <OpenInNewIcon className={outletContextProps.isDarkMode ? "favourites-page--material-icons favourites-page--material-icons-dark-mode" : "favourites-page--material-icons"} />
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
              <IndeterminateCheckBoxOutlinedIcon className={outletContextProps.isDarkMode ? "favourites-page--material-icons favourites-page--material-icons-dark-mode" : "favourites-page--material-icons"} />
            </button>
          </div>
        );
      }
    );
    // favouritesList = favesList.map(
    //   ({ author, linecount, lines, title }, index) => {
    //     return (
    //       <div key={`${author.slice(0, 2)}${title.slice(0, 2)}${index}`}>
    //         <p>{title}</p>
    //         <p>{author}</p>
    //         <p>linecount: {linecount}</p>
    //         {/* <img src={poetPictureObj.profilepicurl} alt={`image of ${author}`} className="utility-class--responsive-img"/> */}
    //         <div className="poem-detail--poem-text-displayed">
    //           {lines.map((item, index) => {
    //             return <p key={`${item.slice(0,3)}${index}`}>{item}</p>;
    //           })}
    //         </div>
    //         <button onClick={() => handleFavourited({ author, linecount, lines, title })}>Remove from Faves</button>
    //       </div>
    //     );
    //   }
    // );
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
          <h3>Your Saved Favourite Poems</h3>
          {favouritesList}
        </div>
        <div>
          {selectedPoemDetails ? (
            <PoemDetail
              clearSelectedPoemDetails={clearSelectedPoemDetails}
              selectedPoemDetails={selectedPoemDetails}
            />
          ) : (
            <p className="details-component-placeholder-text">Select a poem to view more information...</p>
          )}
        </div>
      </div>
    </>
  );
}
