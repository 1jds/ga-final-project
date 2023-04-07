import { Link } from "react-router-dom";
// import './Error.css'

function Error() {
  return (
    <div className="">
      <div className="">
        <div className="">
          <h1>Error 404!</h1>
          <p>Uh oh, that page doesn't exist.</p>
          <Link to="/poems" className="">
            Go back to the poem finder
          </Link>
          <Link to="/" className="">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
