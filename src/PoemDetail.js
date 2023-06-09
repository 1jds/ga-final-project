import poetPicturesData from "./data/poetPicturesData";
import { useContext } from "react";
import { FavesContext } from "./Poems";

export default function PoemDetail(props) {
  // console.log("PoemDetails Props:", props.selectedPoemDetails);
  const { author, linecount, lines, title } = props.selectedPoemDetails;
  console.log("successful destructure?", author, linecount, lines, title)
  const poetPictureObj = poetPicturesData.find(
    (element) => element.poetname === author
  );
  //   console.log(poetPictureObj)

  const { favesList, handleFavourited } = useContext(FavesContext);
  // console.log("favesList looks like this:", favesList);
  const alreadyFaved = favesList.some(
    (element) => element.title === props.selectedPoemDetails.title
  );

  return (
    <div className="poem-detail--container">
      <p className="poem-detail--poem-title">{title}</p>
      <div className="poem-detail--author-information">
        <div>
          <div className="poem-detail--non-title-container">
            <p className="poem-detail--author-name">by {author}</p>
            <p className="poem-detail--line-count">
              Poem length: {linecount} lines
            </p>
          </div>
          <div className="poem-detail--poem-text-displayed">
            {lines.map((item, index) => {
              if (item === "") {
                return (
                  <div key={`${item}${index}`} style={{ height: "1.25rem" }} />
                );
              }
              return <p key={`${item}${index}`}>{item}</p>;
            })}
          </div>
        </div>
        {props.displayImg ? (
          <img
            src={poetPictureObj.profilepicurl}
            alt={`${author}`}
            className="utility-class--responsive-img"
          />
        ) : null}
      </div>
      <button
        className="poem-detail--add-to-favourites-btn"
        onClick={() => {
          handleFavourited(props.selectedPoemDetails);
          props.clearSelectedPoemDetails();
        }}
      >
        {alreadyFaved ? "Remove from Favourites" : "Add to Favourites"}
      </button>
      {props.randomBtn && (
        <button
          className="poem-detail--add-to-favourites-btn"
          onClick={() => {
            props.handleRandomPoemByThisAuthor(author)            
          }}
        >
          Random Poem By This Poet
        </button>
      )}
    </div>
  );
}
