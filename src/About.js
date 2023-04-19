import teamMeetingImg from "./assets/vintage_business_meeting.jpg";

export default function About() {
  return (
    <div className="about-page--container">
      <h2>About Us</h2>
      <img
        className="about-page--hero-img"
        src={teamMeetingImg}
        alt="vintage company team meeting image"
      />
      <p className="about-page--image-caption-text">Some imaginary staff from The Poetry Place's fictional history.</p>
      <div className="about-page--history-info-container">
        <div>
          <p>The Story and History of The Poetry Place</p>
        </div>
        <div>
          <h3>Our Programs</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet,
            consequuntur! Dignissimos dolor quae iusto porro veniam modi impedit
            illo similique quod asperiores, praesentium quas non dolore corrupti
            ab fugit est repellat exercitationem laudantium neque delectus
            deleniti? Eligendi reiciendis error adipisci perferendis alias.
            Labore dicta distinctio reiciendis ad corporis voluptas. Mollitia
            architecto repudiandae corrupti facere esse soluta, placeat qui. Id
            cupiditate saepe iusto voluptatibus alias debitis natus?
          </p>
          <p>
            Quos, nesciunt eius itaque minus esse sequi quod omnis commodi a
            placeat debitis dignissimos illum explicabo magnam repellendus
            aperiam ab pariatur. Facilis nobis similique dolores magni
            dignissimos asperiores excepturi consequuntur, consectetur pariatur
            laudantium reprehenderit illo iusto tempore quibusdam blanditiis,
            voluptatum cumque earum quaerat ipsa, facere tenetur cupiditate
            dicta vero. Officiis sint officia facilis iusto in asperiores saepe
            sapiente labore minus sit. Rem eum quam quisquam ex aliquid dolores
            porro laboriosam consectetur nostrum doloribus neque, dignissimos
            voluptas cupiditate. Soluta culpa ullam consequatur libero illum
            deserunt.
          </p>
        </div>
      </div>
      {/* <h2>You've fou  nd the About sub-page!</h2> */}
    </div>
  );
}
