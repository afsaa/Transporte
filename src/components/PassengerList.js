import React from "react";
import PassengerCard from "./PassengerCard";
import PageLoading from "./PageLoading";
import "./styles/cardList.css";

class PassengerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      passengers: undefined
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/pasajeros");
      const data = await res.json();
      if (!res.ok) {
        throw Error(res.statusText);
      }
      this.setState({ loading: false, passengers: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }
    if (this.state.error) {
      return <h1>Shit happends!</h1>;
    }
    return (
      <div className="CardList_container">
        <ul className="unstyled-list">
          {this.state.passengers.map(passenger => {
            return (
              <li key={passenger.id}>
                <PassengerCard
                  fullName={passenger.nombre}
                  address={passenger.direccion_residencia}
                  birthday={passenger.fecha_nacimiento}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PassengerList;
