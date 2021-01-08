import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { PlayersContext } from "../../src/PlayersContext";

import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  addPlayer: {
    marginTop: 36,
    padding: 16,
    borderLeft: "10px solid #762f8d",
  },
  input: {
    marginRight: 16,
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
    marginTop: 16,
    marginBottom: 8,
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

  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players`;

  const [busy, setBusy] = useState(false);
  const [playerSuccessfullyCreated, setPlayerSuccessfullyCreated] = useState(
    false
  );

  const onSubmit = async (data) => {
    setBusy(true);
    const createPlayer = await axios({
      method: "POST",
      url: api,
      data,
    });
    setBusy(false);
    fetchData();
    setPlayerSuccessfullyCreated(true);
    clearForm();
    setTimeout(() => {
      setPlayerSuccessfullyCreated(false);
    }, 3000);
  };

  const clearForm = () => {
    return document
      .querySelectorAll("form input")
      .forEach((item) => (item.value = ""));
  };

  const { fetchData } = useContext(PlayersContext);

  return (
    <Collapse in={show}>
      <Paper elevation={6} className={classes.addPlayer}>
        <Typography variant="overline">Adicionar Jogador</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid container>
            <TextField
              label="Jogador"
              placeholder="Nome do Jogador"
              name="name"
              id="name"
              disabled={busy}
              variant="outlined"
              inputRef={register({ required: true })}
              required
              margin="normal"
              className={classes.input}
              size="small"
            />
            <TextField
              label="# Nat 5"
              placeholder="Quantidade de Nat5"
              name="natFiveOwned"
              id="natFiveOwned"
              disabled={busy}
              variant="outlined"
              inputRef={register({ required: true })}
              required
              margin="normal"
              className={classes.input}
              size="small"
            />
            <TextField
              label="Criação"
              placeholder="data de criação"
              name="creationDate"
              id="creationDate"
              disabled={busy}
              variant="outlined"
              inputRef={register({ required: true })}
              required
              margin="normal"
              className={classes.input}
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.submit}
              size="small"
              disabled={busy}
              startIcon={<AddCircleIcon />}
            >
              {busy ? (
                <CircularProgress size={26} className={classes.progress} />
              ) : (
                "Criar!"
              )}
            </Button>
          </Grid>
        </form>
        <Collapse in={playerSuccessfullyCreated} className={classes.alert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setPlayerSuccessfullyCreated(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Jogador criado com sucesso!
          </Alert>
        </Collapse>
      </Paper>
    </Collapse>
  );
};

export default Login;
