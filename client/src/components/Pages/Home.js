import React, { Fragment } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

import "../styles/home.css";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <div className="homepage-container">
        <div className="hero">
          <h1 className="hero-heading">Sustainable Transport is the Future!</h1>
          <h3 className="hero-subheading">
            We believe that the future for the automotive market is electric as
            our world is asking for cleaner transport mediums. If you are in the
            same page come and join our fleet.
          </h3>
        </div>
        <div className="take-action-container">
          <h2 className="take-action-heading">Join our fleet now!</h2>
          <Link to="/addPassenger">
            <button className="take-action-btn">Join me in!</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
