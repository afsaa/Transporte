import React from "react";
import Navbar from "../Navbar";

import "../styles/home.css";

export default function Home() {
  return (
    <div className="homepage-container">
      <Navbar />
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
