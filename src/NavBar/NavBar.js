import React from "react";

function NavBar() {
  return (
    <>
      <nav className="navigation visible_menu">
        <ul id="menu-navigation" className="menu">
          <li className="menu-item">
            <span>About</span>
          </li>
          <li className="menu-item">
            <span>Resume</span>
          </li>
          <li className="menu-item">
            <span>Projects</span>
          </li>
          <li className="menu-item">
            <span>Skills</span>
          </li>
          <li className="menu-item">
            <span>News</span>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
