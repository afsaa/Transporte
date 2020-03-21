import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import PassengerList from "./components/PassengerList";
import { GlobalProvider } from "./context/GlobalState";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/passengers">
            <PassengerList />
          </Route>
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
