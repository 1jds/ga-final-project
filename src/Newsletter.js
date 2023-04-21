export default function Newsletter() {
  return (
    <div className="about-page--container">
      <h2>Newsletter Sign-up</h2>
      <p className="newsletter-page--tagline">
        I would like to receive your amazing, exciting imaginary newsletter!
      </p>
      <p className="newsletter-page--asterisk-note">An asterisk (*) denotes a required field.</p>
      <form className="newsletter-page--form-element">
        <div className="newsletter-page--form-input-element">
          <label htmlFor="firstname">First Name*</label>
          <input
            type="text"
            id="firstname"
          />
        </div>
        <div className="newsletter-page--form-input-element">
          <label htmlFor="firstname">Last Name*</label>
          <input
            type="text"
            id="firstname"
          />
        </div>
        <div className="newsletter-page--form-input-element">
          <label htmlFor="firstname">Email*</label>
          <input
            type="text"
            id="firstname"
          />
        </div>
      </form>
      <button className="newsletter-page--subscribe-btn">Subscribe</button>
      <p className="newsletter-page--form-terms">
        By clicking "Subscribe," you agree to The Poetry Foundation's collection
        and use of your personal information submitted through this form in
        accordance with our Terms of Service and Privacy Policy, which may
        include use with our online advertising programs.
      </p>
    </div>
  );
}
