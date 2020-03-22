import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import logo from "../../img/logo.png";

export default function Home() {
  return (
    <div className="homepage-container">
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
      <div className="hero">
        <h1 className="hero-heading">Sustainable Transport Is The New Way!</h1>
        <h3 className="hero-subheading">
          As the world is asking for sustainable ways of transport, we are
          bringing solutions.
        </h3>
      </div>
      <div className="take-action-container">
        <h2 className="take-action-heading">Join our fleet now!</h2>
        <button className="take-action-btn">Join me in!</button>
      </div>
    </div>
  );
}
