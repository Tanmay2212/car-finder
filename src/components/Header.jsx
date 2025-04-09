// src/components/Header.jsx
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Car Finder 🚗</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </nav>
    </header>
  );
}

export default Header;
