import { useOutletContext } from "react-router";

export default function SearchResults(props) {
  const contextProps = useOutletContext();
  const numberOfResultsPages = Math.ceil(contextProps.length / 10);
  const resultsList = contextProps.map(({ author, title }, index) => {
    
    return (
      <div style={{display: 'flex', gap: '1rem', margin: '1rem 0rem'}}>
        <span><strong>{author}</strong></span>
        <span>{title.length < 45 ? title : `${title.slice(0, 45)}...`}</span>
      </div>
    );
  });

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
          <p>Number of pages needed: {numberOfResultsPages}</p>
          {/* {contextProps ? (
            <pre>{JSON.stringify(contextProps, null, 2)}</pre>
          ) : (
            <></>
          )} */}
          {resultsList}
        </div>
        <div>
          <h2>Second DIV</h2>
        </div>
      </div>
    </>
  );
}
