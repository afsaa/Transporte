import React from 'react';
import PassengerCard from './components/PassengerCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <PassengerCard fullName="Andres Saa" address="Av. Siempre Viva" birthday="1994-04-03" />
    </div>
  );
}

export default App;
