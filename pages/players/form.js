import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import axios from "axios";
import Loading from "../../components/layout/loading";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
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
}));

import EditIcon from "@material-ui/icons/Edit";

const Form = ({ preloadedValues, playerId }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      ...preloadedValues,
      creationDate: new Date(preloadedValues.creationDate).toLocaleDateString(),
    },
  });
  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players/${playerId}`;
  const [busy, setBusy] = useState(false);
  const [updated, setUpdated] = useState(false);

  const onSubmit = (data) => {
    const fecthData = async () => {
      setBusy(true);
      const result = await axios({
        method: "PATCH",
        url: api,
        data,
      });
      setBusy(false);
      setUpdated(true);
    };
    fecthData();
    console.log(data);
  };

  return (
    <>
      {preloadedValues ? (
        <form
          className={`edit-player${busy ? " loading" : ""}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Paper elevation={6} className={classes.paper}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <EditIcon fontSize="small" />
              </Grid>
              <Grid item>
                <Typography variant="overline">Editar</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  label="Nome"
                  variant="outlined"
                  name="name"
                  id="name"
                  inputRef={register({ required: true })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                />
              </Grid>
              <Grid item>
                {" "}
                <TextField
                  label="# NAT5"
                  variant="outlined"
                  name="natFiveOwned"
                  id="natFiveOwned"
                  inputRef={register({ required: true })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                />
              </Grid>
              <Grid item>
                {" "}
                <TextField
                  label="Data criação"
                  variant="outlined"
                  name="creationDate"
                  id="creationDate"
                  inputRef={register({ required: true })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  size="large"
                  disabled={busy}
                >
                  {busy ? (
                    <CircularProgress size={26} className={classes.progress} />
                  ) : (
                    "atualizar!"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      ) : null}
    </>
  );
};

export default Form;
