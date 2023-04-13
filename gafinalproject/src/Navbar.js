import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar--search-area">
        <form>
          <div>
            <div className="utility-class--inlineblock">
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
              <label htmlFor="author">Author</label>
            </div>
            <div className="utility-class--inlineblock">
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
              <label htmlFor="title">Title</label>
            </div>
            <div className="utility-class--inlineblock">
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
              <label htmlFor="lines">Lines</label>
            </div>
            <div className="utility-class--inlineblock">
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
              <label htmlFor="linecount">Linecount</label>
            </div>
          </div>
          <div>
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
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/poems/search"
                element={<SearchResults />}
              >
                Search
              </Link>
            </button>
          </div>
        </form>

        {/* {results} */}
        {/* <RhymingHelp wordToRhyme="dog" /> */}
      </div>

      <div>
        <img src={logo} className="navbar--logo" />
      </div>

      {/* <input type="text" />
        <button>Q</button> */}
      <div className="navbar--links-collection">
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
