import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import PassengerList from "./components/PassengerList";
import AddPassenger from "./components/AddPassenger";
import { GlobalProvider } from "./context/GlobalState";
import { SnackbarProvider } from "notistack";
import "./components/styles/App.css";

function App() {
  return (
    <GlobalProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/passengers">
              <PassengerList />
            </Route>
            <Route path="/addPassenger">
              <AddPassenger />
            </Route>
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </GlobalProvider>
  );
}

export default App;
