import React from "react";
import NavBar from "./NavBar";

import "./NavBar-vertical.css"

function NavBarVertical() {
  return (
    <>
      <header className="site-header dark-color">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="logo-block col-auto">
              <div className="site-logo">
                <span>Sachin Supunthaka</span>

                <div className="scheme-switcher">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="right col-auto">
              <NavBar />

              <div
                className="nav-butter visible_menu"
                data-magic-cursor="link-small"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBarVertical;
