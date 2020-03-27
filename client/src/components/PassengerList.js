import React, {
  Fragment,
  useState,
  useContext,
  useMemo,
  useEffect
} from "react";
import { GlobalContext } from "../context/GlobalState";
import Navbar from "./Navbar";
import PassengerListItem from "./PassengerListItem";
import PageLoading from "./PageLoading";
import axios from "axios";
import "./styles/cardList.css";

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

function PassengerList() {
  const [storedJWT, setStoredJWT] = useState(null);
  const { loading, error, passengers, getPassengers } = useContext(
    GlobalContext
  );
  const { query, setQuery, filteredPassengers } = useSearchPassengers(
    passengers
  );

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
      setStoredJWT(res.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!storedJWT) {
      getToken("Kobe", "admin123");
    } else {
      getPassengers(storedJWT);
    }
  }, [storedJWT]);

  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    return <h1>Shit happends!</h1>;
  }
  return (
    <Fragment>
      <Navbar />
      <div className="form-group">
        <label className="form-label">Check if you are in </label>
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
    </Fragment>
  );
}

export default PassengerList;
