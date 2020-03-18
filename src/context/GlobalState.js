import React, { useReducer, createContext } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  passengers: [],
  loading: true,
  error: null
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getPassengers() {
    try {
      const res = await axios.get("/api/v1/passengers");
      dispatch({
        type: "GET_PASSENGERS",
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: "PASSENGER_ERROR",
        payload: error.error
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        passengers: state.passengers,
        loading: state.loading,
        error: state.error,
        getPassengers
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
