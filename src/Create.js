import RhymingHelp from "./RhymingHelp";

export default function Create() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <div>
        <h2>Compose your own poem</h2>
        <input type="text" />
        <button>Save Draft</button>
      </div>
      <RhymingHelp />
    </div>
  );
}
