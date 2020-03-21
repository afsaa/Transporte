import React, { useState, useContext, useMemo, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import PassengerListItem from "./PassengerListItem";
import PageLoading from "./PageLoading";
import axios from "axios";
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
    // this.fetchData();
    // this.getToken();
  }

  render() {
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

async function getToken(username, password) {
  try {
    const res = await axios.post("http://localhost:8080/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    localStorage.setItem("JWT", res.data.token);
  } catch (error) {
    console.log(error);
  }
}

function PassengersList(props) {
  const { loading, error, passengers, getPassengers } = useContext(
    GlobalContext
  );

  useEffect(() => {
    const storedJWT = localStorage.getItem("JWT");
    if (storedJWT) {
      getPassengers(storedJWT);
    } else {
      getToken("Kobe", "admin123");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //const passengers = props.passengers;
  // console.log(passengers);
  const { query, setQuery, filteredPassengers } = useSearchPassengers(
    passengers
  );
  // console.log(context);
  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    return <h1>Shit happends!</h1>;
  }
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
