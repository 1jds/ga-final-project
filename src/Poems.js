import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const FavesContext = createContext();

export default function PoemsList() {
  const [APIresponse, setAPIresponse] = useState([
    {
      msg: "Use the search bar to find some poetry!",
      linecount: 0,
    },
  ]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const [favesList, setFavesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const locallySavedFavesList = JSON.parse(
      localStorage.getItem("favouritedpoems")
    );
    const locallySavedFavesCount = JSON.parse(
      localStorage.getItem("favouritedpoemscount")
    );
    if (locallySavedFavesList) {
      setFavesList(locallySavedFavesList);
      setFavouritesCount(locallySavedFavesCount);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else if (!isFirstRender) {
      localStorage.setItem("favouritedpoems", JSON.stringify(favesList));
      localStorage.setItem(
        "favouritedpoemscount",
        JSON.stringify(favouritesCount)
      );
    }
  }, [favesList]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`https://poetrydb.org/${searchType}/${searchTerm}`)
      .then((response) => {
        // console.log(response.status);
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        if (data.status === 404 || data.status === 405) {
          setAPIresponse([
            {
              msg: "No results found. Please adjust your search parameters and try again.",
              linecount: 0,
            },
          ]);
          return;
        }
        setAPIresponse(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    navigate("/poems/search");
  };

  const handleSearchTextInput = (e) => {
    let { value: searchWords } = e.target;
    setSearchTerm(searchWords);
  };

  function handleFavourited(poemInfo) {
    const sometestResult = favesList.some(
      (element) => element.title === poemInfo.title // A possible problem here is if there are two poems with the same title, but since the API data doesn't come with IDs this is a decent temporary solution
    );
    if (sometestResult) {
      setFavesList((prevState) => [
        ...prevState.filter((item) => item.title !== poemInfo.title),
      ]);
      setFavouritesCount((prevState) => prevState - 1);
    } else if (!sometestResult) {
      setFavesList((prevState) => [...prevState, poemInfo]);
      setFavouritesCount((prevState) => prevState + 1);
    }
  }

  return (
    <FavesContext.Provider value={{ favesList, handleFavourited }}>
      <div
        style={
          isDarkMode
            ? { backgroundColor: "var(--theme-dark-bg-color)", color: "white" }
            : { backgroundColor: "var(--theme-light-bg-color)" }
        }
        className="poems--container"
      >
        <Navbar
          favouritesCount={favouritesCount}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          handleSearch={handleSearch}
          handleSearchTextInput={handleSearchTextInput}
          searchType={searchType}
          setSearchType={setSearchType}
          searchTerm={searchTerm}
        />

        <Outlet context={{ APIresponse, isDarkMode }} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    </FavesContext.Provider>
  );
}
