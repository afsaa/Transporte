import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../img/logo.png";

export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="menu">
          <div className="menu-branding">
            <img className="menu-logo" src={logo} alt="logo" />
          </div>
          <ul className="menu-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/passengers">
                Passengers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trips">
                Trips
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}
