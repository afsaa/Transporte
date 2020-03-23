import React from "react";

import "./styles/card.css";

function PassengerCard(props) {
  return (
    <React.Fragment>
      <div className="card-container">
        <h2 className="name-text">{props.name}</h2>
        <h3 className="address-text">Address: {props.address}</h3>
        <h4 className="birthday-text">Birthday: {props.birthday}</h4>
      </div>
    </React.Fragment>
  );
}

export default PassengerCard;
