import React, { useReducer, createContext } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  passengers: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider value={{ passengers: state.passengers }}>
      {children}
    </GlobalContext.Provider>
  );
};
