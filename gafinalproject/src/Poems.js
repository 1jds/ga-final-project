import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { createContext } from "react";
import SearchResults from "./SearchResults";
import { useNavigate } from 'react-router-dom'


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
  const navigate = useNavigate()

  useEffect(() => {
  // alert("Getting local storage!")
    const locallySavedFavesList = JSON.parse(localStorage.getItem('favouritedpoems'));
    const locallySavedFavesCount = JSON.parse(localStorage.getItem('favouritedpoemscount'))
  if (locallySavedFavesList) {
    setFavesList(locallySavedFavesList);
    setFavouritesCount(locallySavedFavesCount);
  }
}, [])

useEffect(() => {
  if(isFirstRender) {
    setIsFirstRender(false)
  } else if(!isFirstRender) {
    // alert("Setting local storage!")
    localStorage.setItem('favouritedpoems', JSON.stringify(favesList));
    localStorage.setItem('favouritedpoemscount', JSON.stringify(favouritesCount))
  }
}, [favesList])

// useEffect(() => {
//   alert("MOUNTED");
//   return () => alert("UNMOUNTED");
// }, [navigate]);

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
          // console.log("search for something else, dude!");
          setAPIresponse([
            {
              msg: "No results found. Please adjust your search parameters and try again.",
              linecount: 0,
            },
          ]);
          return;
        }
        // console.log("data to set:", data);
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

  // const handleFaves = (e) => {

  // }

  // --theme-light-bg-color: white;
  // --theme-dark-bg-color: rgba(5, 5, 5, 0.75);
  function handleFavourited(poemInfo) {
    const sometestResult = favesList.some(
      (element) => element.title === poemInfo.title  // A possible problem here is if there are two poems with the same title, but since the API data doesn't come with IDs this is a decent temporary solution
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

        {/* <svg
        width="212.55"
        height="45.9389217653227"
        viewBox="0 0 434.7337123414027 93.96000000000001"
        class="css-1j8o68f"
      >
        <defs id="SvgjsDefs2174"></defs>
        
        <g
          id="SvgjsG2176"
          featurekey="inlineSymbolFeature-0"
          transform="matrix(2.0114314534124405,0,0,2.0114314534124405,131,0)"
          fill="#111111"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M35.03,35.148c-7.732-3.146-11.661-3.487-15.821-3.848c-4.101-0.354-8.347-0.729-16.382-3.95  c-0.597,0.901-1.09,2.651-1.487,4.772c8.261,2.153,12.443,1.988,16.477,1.821c4.081-0.168,8.298-0.341,16.548,1.847  c2.792,0.741,4.966,1.47,6.695,2.176C39.524,37.117,37.569,36.181,35.03,35.148z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M34.048,37.982c-8.068-2.141-12.008-1.98-16.182-1.808c-4.11,0.17-8.367,0.338-16.739-1.835  c-0.27,1.654-0.488,3.445-0.661,5.174c8.167,0.969,12.216,0.268,16.122-0.416c4.021-0.703,8.179-1.43,16.647-0.348  c3.312,0.424,5.807,0.94,7.732,1.5C39.258,39.53,37.023,38.771,34.048,37.982z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M16.801,41.31c-3.991,0.697-8.125,1.412-16.451,0.43C0.18,43.635,0.063,45.386,0,46.685  c8.365-0.059,12.312-1.281,16.133-2.465c3.901-1.208,7.934-2.457,16.469-2.457c2.886,0,5.174,0.146,7.025,0.387  c-1.702-0.43-3.83-0.831-6.547-1.178C24.8,39.912,20.914,40.591,16.801,41.31z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M79.611,33.969c4.043,0.165,8.232,0.333,16.533-1.835c-0.41-2.307-0.904-4.096-1.479-4.783  c-8.078,3.246-12.334,3.619-16.447,3.975c-4.16,0.361-8.09,0.7-15.822,3.849c-2.539,1.034-4.496,1.97-6.031,2.821  c1.729-0.707,3.904-1.438,6.699-2.178C71.312,33.628,75.531,33.802,79.611,33.969z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M94.041,25.278L85.287,0c-6.336,2.515-9.715,2.807-12.984,3.09c-3.342,0.289-6.498,0.562-12.707,3.089  c-8.611,3.506-9.078,5.696-9.328,6.873c-0.121,0.565-0.264,1.197-1.038,1.609v28.725c0.004-0.006,0.012-0.012,0.017-0.02  c0.036-0.052,0.068-0.115,0.1-0.184c0.065-0.158,0.114-0.348,0.174-0.625c0.39-1.831,1.042-4.896,12.414-9.523  c7.904-3.22,12.111-3.583,16.18-3.936C82.107,28.753,86.234,28.397,94.041,25.278z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M80.837,39.123c3.91,0.684,7.961,1.383,16.141,0.414c-0.172-1.79-0.383-3.569-0.633-5.184  c-8.398,2.184-12.664,2.017-16.785,1.846c-4.174-0.171-8.113-0.332-16.182,1.809c-2.975,0.79-5.209,1.549-6.922,2.27  c1.926-0.56,4.422-1.076,7.734-1.5C72.656,37.693,76.818,38.42,80.837,39.123z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M81.294,44.247c3.82,1.183,7.768,2.406,16.133,2.466c-0.072-1.51-0.188-3.213-0.336-4.948  c-8.334,0.985-12.473,0.269-16.465-0.429c-4.113-0.719-7.998-1.397-16.279-0.338c-2.715,0.348-4.844,0.75-6.545,1.178  c1.85-0.238,4.137-0.387,7.023-0.387C73.361,41.789,77.394,43.039,81.294,44.247z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M47.907,42.533c0.033,0.154,0.061,0.279,0.091,0.394V14.662c-0.774-0.412-0.917-1.044-1.037-1.609  c-0.251-1.177-0.717-3.367-9.329-6.873c-6.209-2.527-9.365-2.8-12.706-3.089c-3.27-0.283-6.647-0.576-12.981-3.089L3.382,25.25  c7.81,3.121,11.938,3.479,15.933,3.824c4.068,0.353,8.274,0.717,16.179,3.934C46.866,37.636,47.518,40.702,47.907,42.533z"
          ></path>
        </g>
        
      </svg>
      <div className="test-container">
        <p className="test-text">
          <span className="first-letter-test">P</span>lace{" "}
          <span className="first-letter-test">P</span>oetry{" "}
          <span className="first-letter-test">T</span>he
        </p>
      </div> */}
        {/* <div style={{ border: "3px solid yellow" }}>
        <SearchBar />
      </div> */}
        {/* <pre>{JSON.stringify(APIresponse, null, 2)}</pre> */}

        <Outlet context={{APIresponse, isDarkMode}} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    </FavesContext.Provider>
  );
}
