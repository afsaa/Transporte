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
  const {
    JWT,
    loading,
    error,
    passengers,
    getToken,
    getPassengers
  } = useContext(GlobalContext);
  const { query, setQuery, filteredPassengers } = useSearchPassengers(
    passengers
  );

  useEffect(() => {
    if (!JWT) {
      getToken("Kobe", "admin123");
    } else {
      getPassengers(JWT);
    }
  }, [JWT]);

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
        <input
          type="text"
          className="form-control"
          value={query}
          placeholder="Type your name here"
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
