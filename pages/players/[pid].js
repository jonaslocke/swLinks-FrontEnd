import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const size = 120;
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#cb7be6",
    width: "100%",
    height: size,
    marginTop: -theme.spacing(1),
    marginBottom: size / 2,
    paddingLeft: 1.5 * size,
    paddingBottom: theme.spacing(1),
    position: "relative",
  },
  avatar: {
    borderRadius: "50%",
    width: size,
    height: size,
    position: "absolute",
    top: size / 4,
    left: size / 4,
    border: `${theme.spacing(1)}px solid #cb7be6`,
  },
  form: {
    marginLeft: size / 4 + theme.spacing(1),
    marginRight: size / 4 + theme.spacing(1),
  },
}));

import axios from "axios";

import Form from "./form";
import { Avatar, Grid, TextField, Typography } from "@material-ui/core";

const pid = () => {
  const classes = useStyles();
  const router = useRouter();
  const { pid } = router.query;
  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players/${pid}`;
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await axios(api);
    //   setPlayerData(result.data);
    //   console.log(result.data)
    // };
    // fetchData();
    setPlayerData({
      _id: "5fed393f5907e400086ff63b",
      name: "hebert",
      natFiveOwned: 35,
      creationDate: "2019-01-09T00:00:00.000Z",
      __v: 0,
    });
  }, []);

  return (
    <>
      {playerData ? (
        <>
          <Grid
            container
            justify="flex-end"
            direction="column"
            className={classes.header}
          >
            <Avatar
              alt={playerData.name}
              src="https://i.imgur.com/Xlo4iQT.jpg"
              className={classes.avatar}
            />
            <Typography variant="h4">{playerData.name}</Typography>
            <Typography variant="caption">
              Conta criada em:{" "}
              {new Date(playerData.creationDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <div className={classes.form}>
            <Form preloadedValues={playerData}></Form>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default pid;
