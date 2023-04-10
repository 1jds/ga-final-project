import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PoemsList from "./PoemsList";
import PoemDetail from "./PoemDetail";
import ErrorPage from "./ErrorPage";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/poems" element={<PoemsList />}>
        <Route path=":poemID" element={<PoemDetail />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
