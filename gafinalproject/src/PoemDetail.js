import poetPicturesData from "./data/poetPicturesData";
import { useContext } from "react";
import { FavesContext } from "./Poems";

export default function PoemDetail(props) {
  console.log("PoemDetails Props:", props.selectedPoemDetails);
  const { author, linecount, lines, title } = props.selectedPoemDetails;
  // console.log("successful destructure?", author, linecount, lines, title)
  const poetPictureObj = poetPicturesData.find(
    (element) => element.poetname === author
  );
  //   console.log(poetPictureObj)

  const { favesList, handleFavourited } = useContext(FavesContext);
  console.log("favesList looks like this:", favesList);
  const alreadyFaved = favesList.some(
    (element) => element.title === props.selectedPoemDetails.title
  );

  return (
    <div>
      <p>{title}</p>
      <p>{author}</p>
      <p>linecount: {linecount}</p>
      <img
        src={poetPictureObj.profilepicurl}
        alt={`image of ${author}`}
        className="utility-class--responsive-img"
      />
      <p className="poem-detail--poem-text-displayed">
        {lines.map((item) => {
          return <p>{item}</p>;
        })}
      </p>
      <button onClick={() => {handleFavourited(props.selectedPoemDetails); props.clearSelectedPoemDetails()}}>
        {alreadyFaved ? "Remove from Faves" : "Add to Faves"}
      </button>
    </div>
  );
}
