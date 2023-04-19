import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Poems from "./Poems";
import PoemDetail from "./PoemDetail";
import ErrorPage from "./ErrorPage";
import "./index.css";
import SearchResults from "./SearchResults";
import About from "./About"
import Newsletter from "./Newsletter";
import Learn from "./Learn";
import Create from "./Create"
import Favourites from "./Favourites"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/poems" element={<Poems />}>
        <Route index element={<About />} />
        <Route path="/poems/about" element={<About />} />
        <Route path="/poems/search" element={<SearchResults />} />
        <Route path="/poems/newsletter" element={<Newsletter />} />
        <Route path="/poems/learn" element={<Learn />} />
        <Route path="/poems/create" element={<Create />} />
        <Route path="/poems/favourites" element={<Favourites />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>    
  );
}

export default App;
