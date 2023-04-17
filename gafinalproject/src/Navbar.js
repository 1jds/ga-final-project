import { useState } from "react";
import { Link } from "react-router-dom";
import navLogoDark from "./assets/nav_logo_dark_theme.svg";
import navLogoLight from "./assets/nav_logo_light_theme.svg";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Badge from '@mui/material/Badge'

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div
        className={
          props.isDarkMode
            ? "navbar--light-dark-theme-toggle navbar--theme-icon-dark-mode"
            : "navbar--light-dark-theme-toggle navbar--theme-icon-light-mode"
        }
      >
        {props.isDarkMode ? (
          <div
            role="button"
            onClick={() => {
              props.setIsDarkMode((prevState) => !prevState);
            }}
          >
            <DarkModeIcon />
          </div>
        ) : (
          <div
            role="button"
            onClick={() => {
              props.setIsDarkMode((prevState) => !prevState);
            }}
          >
            <LightModeIcon />
          </div>
        )}
      </div>
      <div className="navbar--search-area">
        <form>
          <div>
            <div className="utility-class--inlineblock" title="Search by an author's first or last name">
              <input
                onChange={(e) => {
                  props.setSearchType(e.target.value);
                }}
                type="radio"
                id="author"
                name="fav_language"
                value="author"
                checked={props.searchType === "author"}
                title="Search by an author's first or last name"
              />
              <label htmlFor="author">Author</label>
            </div>
            <div className="utility-class--inlineblock" title="Search for a poem by title">
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
            <div className="utility-class--inlineblock" title="Search by a certain line of poetry">
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
            <div className="utility-class--inlineblock" title="Search for poems of a certain line length">
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
          <div style={{ display: "flex" }}>
            <input
              className="search-area--search-input-area"
              onChange={props.handleSearchTextInput}
              value={props.searchTerm}
              type="text"
              placeholder="Search by..."
            />
            <button
              className="search-area--search-button"
              onClick={props.handleSearch}
              disabled={!props.searchType || !props.searchTerm}
            >
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/poems/search"
                element={<SearchResults />}
              >
                <SearchIcon />
              </Link>
            </button>
          </div>
        </form>

        {/* {results} */}
        {/* <RhymingHelp wordToRhyme="dog" /> */}
      </div>

      <div>
      <Link className="navbar--link" to="/">
        <img
          src={props.isDarkMode ? navLogoDark : navLogoLight}
          className="navbar--logo"
        />
      </Link>
      </div>

      {/* <input type="text" />
        <button>Q</button> */}
      <div className="navbar--links-collection">
        <Link className="navbar--link" to="/poems/about">
          About
        </Link>
        <Link className="navbar--link" to="/poems/newsletter">
          Newsletter
        </Link>
        <Link className="navbar--link" to="/poems/learn">
          Learn
        </Link>
        <Link className="navbar--link" to="/poems/create">
          Create
        </Link>

          <Badge badgeContent={props.favouritesCount} color="error">
        <Link className="navbar--link" to="/poems/favourites">
            Favourites
        </Link>
          </Badge>          
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
