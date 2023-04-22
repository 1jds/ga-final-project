import { useEffect, useState } from "react";
import poetPicturesData from "./data/poetPicturesData";
import sanitizeHtml from "sanitize-html";

export default function Learn() {
  const [wikiResponse, setWikiResponse] = useState();
  const [isDisambiguation, setIsDisambiguation] = useState(null);
  const [htmlExtract, setHtmlExtract] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true); //This is just to circumvent useEffect's default behaviour of firing on first render. I guess I could instead just have the regex code in a non-useEffect-function that is called by the fetching function...
  const [poetNamesList, setPoetNamesList] = useState(
    poetPicturesData.map((item, index) => {
      return (
        <button
          key={`${item}${index}`}
          value={item.poetname}
          onClick={(e) => handleSearch(e.target.value)}
        >
          {item.poetname}
        </button>
      );
    })
  );

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      if (wikiResponse.type === "disambiguation") {
        setIsDisambiguation(true);
        setHtmlExtract(
          `<p><strong>Oops!</strong> No appropriate information is available for this poet! Please try another poet or just Google it.</p>`
        );
      } else {
        setIsDisambiguation(false);
        setHtmlExtract(sanitizeHtml(wikiResponse.extract_html));
        // wikipedia data may be sanitized already on their server, but it is publically editable, so a quick safety measure here before setting innerHTML.
      }
    }
  }, [wikiResponse]);

  function createBioMarkup() {
    return { __html: htmlExtract };
  }

  const handleSearch = (poetName) => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${poetName}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Wiki API fetch response data", data)
        setWikiResponse(data);
      });
  };

  return (
    <section style={{ padding: "1rem" }}>
      <h2 className="outlet-page--main-h2-heading">
        You've found the Learn sub-page!
      </h2>
      <p>Find out about a particular poet</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
        >
          {poetNamesList}
        </div>
        <div
          style={{
            maxWidth: "40%",
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          {isDisambiguation ? (
            <></>
          ) : wikiResponse ? (
            <img
              src={wikiResponse.thumbnail.source}
              style={{ maxWidth: "200px", borderRadius: "50px 0px 0px 0px" }}
              alt="author portrait"
            />
          ) : (
            <></>
          )}
          {htmlExtract ? (
            <div
              className="learn-page--wikipedia-html-text-div"
              dangerouslySetInnerHTML={createBioMarkup()}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* <pre>{JSON.stringify(wikiResponse, null, 2)}</pre> */}
    </section>
  );
}

// I tried to sanitise the extract_html provided by the Wikipedia API, but my simple regex tripped up on words like 'manuscript'. So, this was unsuccessful. I changed it to use just the 'extract' string but to remove the first number of letters where the name would be.
//
// import { useEffect, useState } from "react";
// import poetPicturesData from './data/poetPicturesData'

// export default function Learn() {
//   const [wikiResponse, setWikiResponse] = useState();
//   const [isSanitary, setIsSanitary] = useState(false);
//   const [isInitialRender, setIsInitialRender] = useState(true); //This is just to circumvent useEffect's default behaviour of firing on first render. I guess I could instead just have the regex code in a non-useEffect-function that is called by the fetching function...
//   const [searchText, setSearchText] = useState('');
//   const [poetNamesList, setPoetNamesList] = useState(poetPicturesData.map((item, index) => {
//     return (
//         <button key={`${item}${index}`} value={item.poetname} onClick={(e) => handleSearch(e.target.value)}>{item.poetname}</button>
//     )
// }));

// useEffect(() => {
//     // wikipedia data may be sanitized already on their server, but it is publically editable, so a quick safety measure here before setting innerHTML. This is obviously not perfect, but better than nothing. Could use: https://github.com/apostrophecms/sanitize-html or: https://github.com/cure53/DOMPurify
//       if(isInitialRender){
//           setIsInitialRender(false);
//           console.log("First render here, dude!")
//         } else {
//             console.log("Got to here #1")
//         //   console.log("extra_html unsanitary?", /script/gim.test(wikiResponse.extract_html));
//           if (/script|object|embbed|frameset|iframe|form|textarea|input|button/igm.test(wikiResponse.extract_html)) {
//             console.log("Got to here #2")
//             setIsSanitary(false);
//           } else if (/script|object|embbed|frameset|iframe|form|textarea|input|button/igm.test(wikiResponse.extract_html) === false) {
//             console.log("Got to here #3")
//             setIsSanitary(true);
//           }
//         }
//   }, [wikiResponse]);

//   function createBioMarkup() {
//     return ({__html: wikiResponse.extract_html});
//   }

//   const handleSearchInput = (e) => {
//     // console.log(e.target.value);
//     setSearchText(e.target.value)
//   }

//   const handleSearch = (poetName) => {
//     fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${poetName}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Wiki API fetch response data", data)
//         setWikiResponse(data)

//     })
//   }

//   return (
//     <>
//       <h2>You've found the Learn sub-page!</h2>
//       <p>Find out about a particular poet</p>
//       {poetNamesList}
//       <input type="text" placeholder="Input a poet's name" onChange={handleSearchInput}/><button onClick={handleSearch}>Search</button>
//       {/* <pre>{JSON.stringify(wikiResponse, null, 2)}</pre> */}
//       {isSanitary ? <div dangerouslySetInnerHTML={createBioMarkup()} /> : <></>}
//     </>
//   );
// }
