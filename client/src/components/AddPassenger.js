import React, { Fragment, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function AddPassenger() {
  const { loading, error, passengers } = useContext(GlobalContext);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.address.value);
    console.log(e.target.birthday.value);
  };

  return (
    <Fragment>
      <h1>Fill the form with your data to join us!</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="name" placeholder="Your name" />
        <input type="text" name="address" placeholder="Your address" />
        <input type="text" name="birthday" placeholder="Your birthday" />
        <br />
        <button type="submit">Join the fleet</button>
      </form>
    </Fragment>
  );
}

export default AddPassenger;
