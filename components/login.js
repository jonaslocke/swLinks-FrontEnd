import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import { UserContext } from "../src/UserContext";

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: 48,
  },
  avatar: {
    backgroundColor: "#762f8d",
    color: "white",
    width: 50,
    height: 50,
  },
  input: {
    "& label.Mui-focused": {
      color: "#cb7be6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#cb7be6",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#cb7be6",
      },
    },
  },
  submit: {
    backgroundColor: "#762f8d",
    color: "white",
    marginTop: 12,
    "&:hover": {
      backgroundColor: "#cb7be6",
      color: "#762f8d",
    },
  },
  progress: {
    color: "white",
  },
  alert: {
    marginTop: 20,
  },
}));

const Login = ({ show, setShow }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/login`;
  //   const [logged, setLogged] = useState(false);
  const [user, setUser] = useState([]);
  const [busy, setBusy] = useState(false);
  const [triedLogin, setTriedLogin] = useState(false);
  const { logged, setLogged } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = (data) => {
    const fecthData = async () => {
      setBusy(true);
      const result = await axios({
        method: "POST",
        url: api,
        data,
      });
      setBusy(false);
      if (result.data.logged) {
        localStorage.setItem("logged", result.data.logged);
        localStorage.setItem("user", result.data.user);
        setShow(false);
        setLogged(true);
      } else {
        setTriedLogin(true);
        setTimeout(() => {
          setTriedLogin(false);
        }, 4000);
      }
    };
    fecthData();
  };

  const clearForm = () => {
    return document
      .querySelectorAll(".input-text")
      .forEach((item) => (item.value = ""));
  };

  const logout = () => {
    localStorage.clear();
    clearForm();
    setLogged(false);
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h2>Entrar</h2>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          label="Usuário"
          placeholder="Entre com usuário"
          name="login"
          id="login"
          disabled={busy}
          variant="outlined"
          inputRef={register({ required: true })}
          fullWidth
          required
          margin="normal"
          className={classes.input}
        />
        <TextField
          label="Senha"
          placeholder="Entre com a senha"
          name="password"
          id="password"
          disabled={busy}
          variant="outlined"
          inputRef={register({ required: true })}
          type="password"
          fullWidth
          required
          margin="normal"
          className={classes.input}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          size="large"
          fullWidth
          disabled={busy}
        >
          {busy ? (
            <CircularProgress size={26} className={classes.progress} />
          ) : (
            "Entrar!"
          )}
        </Button>
        <Collapse in={triedLogin} className={classes.alert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setTriedLogin(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Usuário/Senha incorretos!
          </Alert>
        </Collapse>
      </form>
    </Grid>
  );
};

export default Login;
