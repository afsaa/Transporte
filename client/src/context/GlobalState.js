import React, { useReducer, createContext } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  passengers: [],
  loading: true,
  error: null,
  JWT: null
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getToken(username, password) {
    try {
      const res = await axios.post("/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      dispatch({
        type: "GET_TOKEN",
        payload: res.data.token
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: "PASSENGER_ERROR",
        payload: error.message
      });
    }
  }

  async function getPassengers(JWT) {
    try {
      const res = await axios.get("/api/v1/pasajeros", {
        headers: {
          Authorization: `Bearer ${JWT}`
        }
      });
      dispatch({
        type: "GET_PASSENGERS",
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: "PASSENGER_ERROR",
        payload: error.message
      });
    }
  }

  async function addPassenger(JWT, newPassenger) {
    try {
      const res = await axios.post("/api/v1/pasajeros", newPassenger, {
        headers: {
          Authorization: `Bearer ${JWT}`,
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: "ADD_PASSENGER",
        payload: res.data.data.body
      });
    } catch (error) {
      dispatch({
        type: "PASSENGER_ERROR",
        payload: error.message
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        passengers: state.passengers,
        loading: state.loading,
        error: state.error,
        JWT: state.JWT,
        getToken,
        getPassengers,
        addPassenger
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
