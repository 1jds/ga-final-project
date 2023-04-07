import { useEffect, useState } from "react";
import ResultsSection from "./ResultsSection";
import RhymingHelp from "./RhymingHelp";

export default function SearchBar() {
  const [APIresponse, setAPIresponse] = useState([
    {
      title: "Not found 404",
      author: "Try a different search term",
      lines: [""],
      linecount: "0",
    },
  ]);
  const [searchType, setSearchType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // console.log(APIresponse)

  // author-title-lines-linecount

  // useEffect(() => {
  //     fetch(`https://poetrydb.org/${author-title-lines-linecount}title/${search-term}`)
  //     .then(response => response.json())
  //     .then(data => setAPIresponse(data));
  // }, [])

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`https://poetrydb.org/${searchType}/${searchTerm}`)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        if (data.status === 404 || data.status === 405) {
          console.log("search for something else, dude!");
          setAPIresponse(
            "No results found. Please adjust your search parameters and try again."
          );
          return;
        }
        console.log("data to set:", data);
        setAPIresponse(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchTextInput = (e) => {
    let { value: searchWords } = e.target;
    setSearchTerm(searchWords);
  };

  // const results = APIresponse.map(item => {
  //     return (
  //       <ResultsSection title={item.title} author={item.author} lines={item.lines} />

  //     )
  // })

  
  return (
    <>
      <p>The Search Bar goes here.</p>
      <form>
        <input
          onChange={(e) => {
            setSearchType(e.target.value);
          }}
          type="radio"
          id="author"
          name="fav_language"
          value="author"
          checked={searchType === "author"}
        />
        <label htmlFor="author">author</label>
        <br />

        <input
          onChange={(e) => {
            setSearchType(e.target.value);
          }}
          type="radio"
          id="title"
          name="fav_language"
          value="title"
          checked={searchType === "title"}
        />
        <label htmlFor="title">title</label>
        <br />

        <input
          onChange={(e) => {
            setSearchType(e.target.value);
          }}
          type="radio"
          id="lines"
          name="fav_language"
          value="lines"
          checked={searchType === "lines"}
        />
        <label htmlFor="lines">lines</label>
        <br />

        <input
          onChange={(e) => {
            setSearchType(e.target.value);
          }}
          type="radio"
          id="linecount"
          name="fav_language"
          value="linecount"
          checked={searchType === "linecount"}
        />
        <label htmlFor="linecount">linecount</label>
        <br />

        <input
          onChange={handleSearchTextInput}
          value={searchTerm}
          type="text"
          placeholder="Search"
        />
        <button onClick={handleSearch} disabled={!searchType || !searchTerm}>
          Search
        </button>
      </form>
      <pre>{JSON.stringify(APIresponse, null, 2)}</pre>
      {/* {results} */}
      <RhymingHelp wordToRhyme="dog" />
    </>
  );
}
