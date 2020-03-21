import React from "react";

import "./styles/card.css";

function PassengerCard(props) {
  return (
    <React.Fragment>
      <div className="Card_container">
        <h1>{props.name}</h1>
        <h2>{props.address}</h2>
        <h3>{props.birthday}</h3>
      </div>
    </React.Fragment>
  );
}

export default PassengerCard;
