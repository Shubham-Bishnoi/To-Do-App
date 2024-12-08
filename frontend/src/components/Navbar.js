import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>To-Do App</h1>
      <div>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/todos">Todos</Link>
      </div>
    </nav>
  );
};

export default Navbar;
