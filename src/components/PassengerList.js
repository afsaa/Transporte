import React, { useState, useMemo } from "react";
import PassengerListItem from "./PassengerListItem";
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
            return <PassengerListItem passenger={passenger} />;
          })}
        </ul>
      </div>
    );
  }
}

function useSearchPassengers(passengers) {
  const [query, setQuery] = useState("");
  const [filteredPassengers, setFilteredPassengers] = useState(passengers);

  useMemo(() => {
    const result = passengers.filter(passenger => {
      return `${passenger.name}`.toLowerCase().includes(query.toLowerCase());
    });
  }, [passengers, query]);

  return { query, setQuery, filteredPassengers };
}

export default PassengerList;
