import React from "react";

import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <span className="navbar-logo">Sachin Supunthaka</span>
          <ul className="nav-menu">
            <li className="nav-item">
              <span className="nav-links">About</span>
            </li>
            <li className="nav-item">
              <span className="nav-links">Technologies</span>
            </li>
            <li className="nav-item">
              <span className="nav-links">Projects</span>
            </li>
            <li className="nav-item-last">
              <span className="nav-links-last">Contact</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
