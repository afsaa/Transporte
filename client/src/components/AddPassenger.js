import React, { Fragment, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

function AddPassenger() {
  const { JWT, getToken, addPassenger } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const classes = useStyles();

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
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={e => handleSubmit(e)}
      >
        <TextField
          label="Your name"
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Your address"
          type="text"
          name="address"
          onChange={e => setAddress(e.target.value)}
        />
        <TextField
          label="Your birthday"
          type="text"
          name="birthday"
          onChange={e => setBirthday(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          size="large"
          className={classes.margin}
        >
          Join the fleet
        </Button>
      </form>
    </Fragment>
  );
}

export default AddPassenger;
