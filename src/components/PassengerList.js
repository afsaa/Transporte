import React, { useState, useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalState";
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
    //this.fetchData();
    this.getToken();
  }

  fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/pasajeros", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("JWT")}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(res.statusText);
      }
      this.setState({ loading: false, passengers: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  getToken = async () => {
    try {
      const res = await fetch("http://localhost:8080/authentication", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: "Kobe",
          password: "andressaa94"
        })
      });
      const { token } = await res.json();
      localStorage.setItem("JWT", token);
      this.fetchData();
      if (!res.ok) {
        throw Error(res.statusText);
      }
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

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
  const context = useContext(GlobalContext);
  const passengers = props.passengers;
  const { query, setQuery, filteredPassengers } = useSearchPassengers(
    passengers
  );
  console.log(context);
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
          {filteredPassengers.map((passenger, i) => {
            return <PassengerListItem key={i} passenger={passenger} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default PassengerList;
