import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";

function App({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;
