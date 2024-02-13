import { useState } from "react";

export default function Newsletter() {
  const [responseBody, setResponseBody] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleFormInput = (e) => {
    const { id, value } = e.target;
    setResponseBody((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Form submission without non-ok response handling
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(responseBody),
      headers: { "Content-Type": "application/json" },
    };
    if (responseBody.firstname && responseBody.lastname && responseBody.email) {
      fetch("https://reqres.in/api/posts", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log("Posted Data:", data))
        .catch((error) => console.log("Error!", error));
    } else {
      alert("A required field is missing. Please review the form."); // Obviously, this is ugly, and it would be better to have some kind of pop-up or tool-tip indicating which form fields are causing the problem. It would also be good to have input validations, but there's no time for that right now :|
    }
  };

  return (
    <div className="newsletter-page--container utility-class--content-container-80">
      <h2 className="outlet-page--main-h2-heading">Newsletter Sign-up</h2>
      <p className="newsletter-page--tagline">
        I would like to receive your amazing, exciting imaginary newsletter!
      </p>
      <p className="newsletter-page--asterisk-note">
        An asterisk (*) denotes a required field.
      </p>
      <form onSubmit={handleSubmit} className="newsletter-page--form-element">
        <div className="newsletter-page--form-input-element">
          <label htmlFor="firstname">First Name*</label>
          <input
            onChange={(e) => handleFormInput(e)}
            type="text"
            id="firstname"
          />
        </div>
        <div className="newsletter-page--form-input-element">
          <label htmlFor="lastname">Last Name*</label>
          <input
            onChange={(e) => handleFormInput(e)}
            type="text"
            id="lastname"
          />
        </div>
        <div className="newsletter-page--form-input-element">
          <label htmlFor="email">Email*</label>
          <input onChange={(e) => handleFormInput(e)} type="email" id="email" />
        </div>
      </form>
      <button
        onClick={handleSubmit}
        type="submit"
        className="newsletter-page--subscribe-btn"
      >
        Subscribe
      </button>
      <p className="newsletter-page--form-terms">
        By clicking "Subscribe," you agree to The Poetry Foundation's collection
        and use of your personal information submitted through this form in
        accordance with our Terms of Service and Privacy Policy, which may
        include use with our online advertising programs.
      </p>
    </div>
  );
}
