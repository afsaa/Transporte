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
    return <PassengersList passengers={this.state.passengers} />;
  }
}

function useSearchPassengers(passengers) {
  const [query, setQuery] = useState("");
  const [filteredPassengers, setFilteredPassengers] = useState(passengers);

  useMemo(() => {
    const result = passengers.filter(passenger => {
      return `${passenger.nombre}`.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredPassengers(result);
  }, [passengers, query]);

  return { query, setQuery, filteredPassengers };
}

function PassengersList(props) {
  const passengers = props.passengers;
  const { query, setQuery, filteredPassengers } = useSearchPassengers(
    passengers
  );
  return (
    <div>
      <div className="form-group">
        <label>Filter Passengers </label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div className="CardList_container">
        <ul className="unstyled-list">
          {filteredPassengers.map(passenger => {
            return <PassengerListItem passenger={passenger} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default PassengerList;
