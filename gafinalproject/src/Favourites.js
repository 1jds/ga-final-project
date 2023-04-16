import { useContext } from "react";
import { FavesContext } from "./Poems";

export default function Favourites() {
  const { favesList, handleFavourited } = useContext(FavesContext);
  let favouritesList = [];
  if (favesList.length === 0) {
    favouritesList = "No favourites added yet";
  } else {
    favouritesList = favesList.map(
      ({ author, linecount, lines, title }, index) => {
        return (
          <div key={`${author.slice(0, 2)}${title.slice(0, 2)}${index}`}>
            <p>{title}</p>
            <p>{author}</p>
            <p>linecount: {linecount}</p>
            {/* <img src={poetPictureObj.profilepicurl} alt={`image of ${author}`} className="utility-class--responsive-img"/> */}
            <div className="poem-detail--poem-text-displayed">
              {lines.map((item, index) => {
                return <p key={`${item.slice(0,3)}${index}`}>{item}</p>;
              })}
            </div>
            <button onClick={() => handleFavourited({ author, linecount, lines, title })}>Remove from Faves</button>
          </div>
        );
      }
    );
  }

  return (
    <>
      <h2>You've found the favourites sub-page!</h2>
      {favouritesList}
    </>
  );
}
