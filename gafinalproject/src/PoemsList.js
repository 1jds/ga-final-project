import SearchBar from "./SearchBar";

export default function PoemsList() {
  return (
    <>
      <p>PoemsList Component</p>
      <div className="test-container">
        <p className="test-text"><span className="first-letter-test">P</span>lace <span className="first-letter-test">P</span>oetry <span className="first-letter-test">T</span>he</p>
      </div>
      <div style={{border: "3px solid yellow"}}>
      <h1>Hello, World!</h1>
      <SearchBar />
    </div>
    </>
  );
}
