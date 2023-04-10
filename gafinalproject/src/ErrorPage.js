import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error-page--background">
      <div className="error-page--black-box">
        <h1>Error 404!</h1>
        <p>Uh oh, that page doesn't exist.</p>
        <Link to="/poems" className="error-page--link">
          Go back to poem finder
        </Link>
        <Link to="/" className="error-page--link">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default Error;
