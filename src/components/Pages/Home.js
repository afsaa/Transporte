import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/passengers">Passengers</Link>
          </li>
          <li>
            <Link to="/trips">Trips</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
