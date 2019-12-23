import React from "react";
import PassengerCard from "./PassengerCard";

class PassengerListItem extends React.Component {
  render() {
    return (
      <li key={this.props.passenger.id}>
        <PassengerCard
          name={this.props.passenger.nombre}
          address={this.props.passenger.direccion_residencia}
          birthday={this.props.passenger.fecha_nacimiento}
        />
      </li>
    );
  }
}

export default PassengerListItem;
