import React, { Fragment, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import md5 from "md5";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch"
    }
  }
}));

export default function Login() {
  const { JWT, getToken } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();

    const registeredUser = {
      username,
      password
    };

    getToken(username, password);
  };

  return (
    <Fragment>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={e => handleSubmit(e)}
      >
        <TextField
          label="Username"
          type="text"
          name="username"
          variant="filled"
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          variant="filled"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          size="large"
          className={classes.margin}
        >
          Login
        </Button>
      </form>
    </Fragment>
  );
}
