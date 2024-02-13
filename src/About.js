import teamMeetingImg from "./assets/vintage_business_meeting.jpg";

export default function About() {
  return (
    <div className="about-page--container">
      <div className="about-page--hero-container">
        <h2 className="outlet-page--main-h2-heading">About Us</h2>
        <img
          className="about-page--hero-img"
          src={teamMeetingImg}
          alt="our company team"
        />
        <p className="about-page--image-caption-text">
          Some imaginary staff from The Poetry Place's fictional history.
        </p>
      </div>
      <div className="about-page--history-info-container">
        <div>
          <p>The Story and History of The Poetry Place</p>
        </div>
        <div>
          <h3>Our Programs</h3>
          <p>
            Welcome to The Poetry Place, where words weave tales and emotions
            take flight. Our journey began in the heart of creativity, sparked
            by a passion for the art of expression. Founded in 2020, The Poetry
            Place was born out of a dream to create a haven for poets, writers,
            and lovers of literature to unite.
          </p>
          <p>
            Our story is etched in the ink of inspiration. The founders, Jemima
            and Big Ted, envisioned a space where verses could dance freely,
            transcending boundaries and echoing diverse voices. It all started
            with a simple belief: poetry has the power to transform, connect,
            and celebrate the shared human experience.
          </p>
          <p>
            As we traversed the landscape of literary exploration, The Poetry
            Place emerged as more than just a platform – it became a community.
            With each poem shared and every story told, our community grew,
            fostering an environment of encouragement and support.
          </p>
          <p>
            Today, The Poetry Place stands as a testament to the resilience of
            creativity. It's a digital sanctuary where poets of all backgrounds
            and styles converge to celebrate the written word. Our diverse
            collection reflects the richness of human emotion, exploring themes
            from love and loss to resilience and hope.
          </p>
          <p>
            Join us in our poetic odyssey, where every line tells a story, and
            every stanza becomes a chapter in the collective narrative of The
            Poetry Place. Together, let's continue to shape the future of
            literary expression and celebrate the timeless beauty of poetry.
          </p>
        </div>
      </div>
    </div>
  );
}
