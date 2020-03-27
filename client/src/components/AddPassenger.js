import React, { Fragment, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function AddPassenger() {
  const { JWT, getToken, addPassenger } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    if (!JWT) {
      getToken("Kobe", "admin123");
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const newPassenger = {
      name,
      address,
      birthday
    };

    addPassenger(JWT, newPassenger);
  };

  return (
    <Fragment>
      <h1>Fill the form with your data to join us!</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
        />
        <input
          type="text"
          name="address"
          onChange={e => setAddress(e.target.value)}
          placeholder="Your address"
        />
        <input
          type="text"
          name="birthday"
          onChange={e => setBirthday(e.target.value)}
          placeholder="Your birthday"
        />
        <br />
        <button type="submit">Join the fleet</button>
      </form>
    </Fragment>
  );
}

export default AddPassenger;
