import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import PassengerList from "./components/PassengerList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/passengers" component={PassengerList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
