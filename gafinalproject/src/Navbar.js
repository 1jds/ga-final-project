import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import logo2 from "./assets/logo2.svg";
import SearchBar from "./SearchBar";

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div
        id="search-area"
        style={{ border: "3px solid dodgerblue", display: "flex", gap: "1rem" }}
      >
        <p>The Search Bar goes here.</p>
        <form>
          <div>
            <input
              onChange={(e) => {
                props.setSearchType(e.target.value);
              }}
              type="radio"
              id="author"
              name="fav_language"
              value="author"
              checked={props.searchType === "author"}
            />
            <label htmlFor="author">author</label>

            <input
              onChange={(e) => {
                props.setSearchType(e.target.value);
              }}
              type="radio"
              id="title"
              name="fav_language"
              value="title"
              checked={props.searchType === "title"}
            />
            <label htmlFor="title">title</label>

            <input
              onChange={(e) => {
                props.setSearchType(e.target.value);
              }}
              type="radio"
              id="lines"
              name="fav_language"
              value="lines"
              checked={props.searchType === "lines"}
            />
            <label htmlFor="lines">lines</label>

            <input
              onChange={(e) => {
                props.setSearchType(e.target.value);
              }}
              type="radio"
              id="linecount"
              name="fav_language"
              value="linecount"
              checked={props.searchType === "linecount"}
            />
            <label htmlFor="linecount">linecount</label>
          </div>

          <input
            onChange={props.handleSearchTextInput}
            value={props.searchTerm}
            type="text"
            placeholder="Search"
          />
          <button
            onClick={props.handleSearch}
            disabled={!props.searchType || !props.searchTerm}
          >
            Search
          </button>
        </form>

        {/* {results} */}
        {/* <RhymingHelp wordToRhyme="dog" /> */}
      </div>

      <div>
        <img src={logo} className="navbar--logo" />
      </div>

      {/* <input type="text" />
        <button>Q</button> */}
      <div>
        <Link to="/poems/about" className="poems-page--link">
          About
        </Link>
        <Link to="/poems/newsletter" className="poems-page--link">
          Newsletter
        </Link>
        <Link to="/poems/learn" className="poems-page--link">
          Learn
        </Link>
        <Link to="/poems/create" className="poems-page--link">
          Create
        </Link>
        <Link to="/poems/favourites" className="poems-page--link">
          Favourites
        </Link>
      </div>
      {/* 
      <div className="sort-and-search">
        <input
          type="text"
          placeholder="Search"
          value={this.state.searchString}
          onChange={this.handleSearch}
        />
        <img src={search} className="search-svg" alt="search" />
        <button onClick={this.handleSort} className="button-53">
          Sort by ${" "}
          <img
            src={this.state.sortHighLow ? expand_more : expand_less}
            alt="price-sort-icon"
          />
        </button>
      </div> */}
    </div>
  );
}
