import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <nav className="navbar">
        <div className="list">
          <NavLink className="list-item" exact to="/home">
            Home
          </NavLink>
          <NavLink className="list-item" to="/createDog">
            Create breed
          </NavLink>
          <NavLink className="list-item" to="/about">
           About
          </NavLink>
        </div>
      </nav>
    </header>
  );
}