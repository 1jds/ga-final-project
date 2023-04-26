import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="test-home-page-container">
      <div className="test-home-page-container-overlay">
        <div className="test-home-page-book-cover-area">
          <div className="book-cover-image">
            <div className="text-box-and-button">
              <p>
                ENTERING
                <br />
                the
                <br />
                POETRY
                <br />
                PLACE
              </p>
              <p>
                A React
                <br />
                Project
              </p>
            </div>
            <p className="author-line">Design by James</p>
            <div className="home-page--link-animation-div">
              <Link to="/poems" className="home-page--link">
                ENTER
              </Link>
            </div>
            <div className="book-cover-spine-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
