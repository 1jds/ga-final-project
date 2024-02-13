import { useEffect, useState } from "react";
import poetPicturesData from "./data/poetPicturesData";
import sanitizeHtml from "sanitize-html";
import PoemDetail from "./PoemDetail";
import { useOutletContext } from "react-router";
import rosesPlaceholderLight from "./assets/roses_placeholder_light_theme.svg";
import rosesPlaceholderDark from "./assets/roses_placeholder_dark_theme.svg";

export default function Learn() {
  const outletContextProps = useOutletContext();
  const [wikiResponse, setWikiResponse] = useState(null);
  const [htmlExtract, setHtmlExtract] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true); //This is just to circumvent useEffect's default behaviour of firing on first render. I guess I could instead just have the regex code in a non-useEffect-function that is called by the fetching function...
  const [randomPoetsPoem, setRandomPoetsPoem] = useState(null);
  const [poetNamesList, setPoetNamesList] = useState(
    poetPicturesData.map((item, index) => {
      return (
        <option key={`${item}${index}`} value={item.poetname}>
          {item.poetname}
        </option>
      );
    })
  );
  console.log(randomPoetsPoem);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      setHtmlExtract(sanitizeHtml(wikiResponse.extract_html));
      // wikipedia data may be sanitized already on their server, but it is publically editable, so a quick safety measure here before setting innerHTML.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiResponse]);

  function createBioMarkup() {
    return { __html: htmlExtract };
  }

  const handleSearch = (poetName) => {
    let poetNameToSearch = "";
    switch (poetName) {
      case "Robinson":
        poetNameToSearch = "Edwin Arlington Robinson";
        break;
      case "Oliver Wendell Holmes":
        poetNameToSearch = "Oliver Wendell Holmes Sr.";
        break;
      case "Major Henry Livingston, Jr.":
        poetNameToSearch = "Henry Livingston Jr.";
        break;
      case "Charlotte Smith":
        poetNameToSearch = "Charlotte Smith (writer)";
        break;
      default:
        poetNameToSearch = poetName;
    } // These are manual work-arounds for edge cases (e.g. 'Robinson' is a typo or something on the API database)
    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${poetNameToSearch}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Wiki API fetch response data", data);
        if (data.type === "disambiguation") {
          fetch(
            `https://en.wikipedia.org/w/api.php?action=opensearch&search=${poetNameToSearch}&format=json&origin=*`
          ).then(function (response) {
            response.json().then(function (secondFetchData) {
              console.log(secondFetchData);
              // data[1] is the array of titles, [2] is the array of descriptions, [3] is the array of links
              let correctArticleTitle =
                secondFetchData[1][
                  secondFetchData[1].findIndex((element) =>
                    element.includes("poet")
                  )
                ];
              if (correctArticleTitle !== -1) {
                // -1 would be not found
                console.log(correctArticleTitle); //the correct article title
                fetch(
                  `https://en.wikipedia.org/api/rest_v1/page/summary/${correctArticleTitle}`
                )
                  .then((response) => response.json())
                  .then((thirdFetchData) => {
                    setWikiResponse(thirdFetchData);
                  });
              }
            });
          });
        } else {
          setWikiResponse(data);
        }
      });
  };

  const handleRandomPoemByThisAuthor = (poetName) => {
    fetch(`https://poetrydb.org/author/${poetName}`)
      .then((res) => res.json())
      .then((poemsByThisAuthorData) => {
        const getRandomPoem = (arr) => {
          // get random index value
          const randomIndex = Math.floor(Math.random() * arr.length);
          // get random item
          const item = arr[randomIndex];
          return item;
        };
        const returnedRandomPoem = getRandomPoem(poemsByThisAuthorData);
        // console.log(returnedRandomPoem);
        setRandomPoetsPoem(returnedRandomPoem);
      });
  };

  return (
    <section className="learn-page--container">
      <h2 className="outlet-page--main-h2-heading">Learn About The Poets!</h2>
      <div className="learn-page--tag-line-and-search-container">
        <p>
          Find out about a particular poet and read a stochastically selected
          poem!
        </p>
        <select
          aria-label="drop-down list to select a poet by name"
          onChange={(e) => {
            if (e.target.value === "default") {
              setIsInitialRender(true);
              setWikiResponse(null);
              setHtmlExtract(null);
            } else if (e.target.value !== "default") {
              handleSearch(e.target.value);
              handleRandomPoemByThisAuthor(e.target.value);
            }
          }}
        >
          <option value="default">Choose a poet</option>
          {poetNamesList ? poetNamesList : null}
        </select>
      </div>
      <div className="learn-page--selection-results-container">
        {wikiResponse ? (
          <>
            <div className="learn-page--about-the-poet-container">
              {wikiResponse ? (
                <p className="learn-page--about-the-author-sub-heading">
                  About The Poet
                </p>
              ) : null}
              <div className="learn-page--about-the-author-details">
                {wikiResponse.thumbnail ? (
                  <img
                    src={wikiResponse.thumbnail.source}
                    style={{ maxWidth: "200px", borderRadius: "1rem" }}
                    alt="author portrait thumbnail"
                  />
                ) : null}
                {htmlExtract ? (
                  <div
                    className="learn-page--wikipedia-html-text-div"
                    dangerouslySetInnerHTML={createBioMarkup()}
                  />
                ) : (
                  <></>
                )}
              </div>
              {wikiResponse ? (
                <div className="learn-page--youtube-iframe-container">
                  <p className="learn-page--about-the-author-sub-heading">
                    About Poetry (Learn More)
                  </p>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/URuMb15CWJs"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null}
            </div>
            <div style={{ flex: "1" }}>
              {randomPoetsPoem ? (
                <PoemDetail
                  selectedPoemDetails={randomPoetsPoem}
                  displayImg={false}
                  randomBtn={true}
                  handleRandomPoemByThisAuthor={handleRandomPoemByThisAuthor}
                />
              ) : null}
            </div>
          </>
        ) : (
          <div
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <img
              alt="placeholder picture of roses"
              src={
                outletContextProps.isDarkMode
                  ? rosesPlaceholderDark
                  : rosesPlaceholderLight
              }
            />
          </div>
        )}
      </div>
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
