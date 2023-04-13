import poetPicturesData from "./data/poetPicturesData";

export default function PoemDetail(props) {
  // console.log("PoemDetails Props:", props)
  const { author, linecount, lines, title } = props.selectedPoemDetails;
  // console.log("successful destructure?", author, linecount, lines, title)
  const poetPictureObj = poetPicturesData.find(element => element.poetname === author)
  console.log(poetPictureObj)
  return (
    <div>
      <p>{title}</p>
      <p>{author}</p>
          <p>linecount: {linecount}</p>
          <img src={poetPictureObj.profilepicurl} alt={`image of ${author}`} className="utility-class--responsive-img"/>
      <p className="poem-detail--poem-text-displayed">
        {lines.map((item) => {
          return <p>{item}</p>;
        })}
      </p>
    </div>
  );
}
