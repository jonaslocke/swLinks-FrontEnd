import { useRef } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";

const AddPlayer = () => {
  const formEl = useRef();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Paper elavation={6}>
      <form ref={formEl} onSubmit={handleSubmit(onSubmit)}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Jogador"
              variant="outlined"
              inputRef={register}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="# Nat 5"
              variant="outlined"
              inputRef={register}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Data criação"
              variant="outlined"
              inputRef={register}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" size="large">
              Criar!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddPlayer;
