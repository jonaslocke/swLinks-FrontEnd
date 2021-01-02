import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Collapse,
} from "@material-ui/core";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SubTitle from "../../components/subTitle";

const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players`;

const useStyles = makeStyles((theme) => ({
  list: { marginTop: 20 },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: "#762f8d",
    color: "white",
  },
  test: {
    display: "none",
  },
  gauge: {
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "double 4px transparent",
    borderRadius: "80px",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    fontSize: 25,
  },
  gaugeColor1: {
    backgroundImage:
      "linear-gradient(#424242, #424242), radial-gradient(circle at top left, #8D2F2F, #FF5F5F)",
  },
  gaugeColor2: {
    backgroundImage:
      "linear-gradient(#424242, #424242), radial-gradient(circle at top left, #2F8D82, #96ECE2)",
  },
  gaugeColor3: {
    backgroundImage:
      "linear-gradient(#424242, #424242), radial-gradient(circle at top left, #4D2F8D, #A881FB)",
  },
  gaugeCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeCaptionMiddle: {
    width: "120%",
  },
  gaugeCaption: {
    marginTop: 22,
    padding: 10,
    textAlign: "center",
  },
}));

export default function Players() {
  const classes = useStyles();
  const [playersList, setPlayersList] = useState([]);

  const fetchData = async () => {
    const result = await axios(api);
    setPlayersList(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    fetchData();
    console.warn("👍 rendered!");
  }, []);

  const getAccountAge = (creationDate) => {
    let date1 = new Date(creationDate);
    let date2 = new Date();

    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Math.floor(Difference_In_Days);
  };

  const getNat5PerDay = (natFiveOwned, creationDate) => {
    return (natFiveOwned / getAccountAge(creationDate)).toFixed(2);
  };

  return (
    <>
      <SubTitle title="Jogadores">
        <SportsEsportsIcon fontSize="large" />
      </SubTitle>
      <Grid container spacing={4} className={classes.list}>
        {playersList.map((player, id) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={id}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {player.name[0].toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={player.name}
                  subheader={`Começou ${new Date(
                    player.creationDate
                  ).toLocaleDateString()}`}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4} className={classes.gaugeCard}>
                      <div
                        className={`${classes.gauge} ${classes.gaugeColor1}`}
                      >
                        {player.natFiveOwned}
                      </div>
                      <Paper className={classes.gaugeCaption} elevation={4}>
                        <Typography variant="caption">Nat 5</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4} className={classes.gaugeCard}>
                      <div
                        className={`${classes.gauge} ${classes.gaugeColor2}`}
                      >
                        {getAccountAge(player.creationDate)}
                      </div>
                      <Paper
                        className={`${classes.gaugeCaption} ${classes.gaugeCaptionMiddle}`}
                        elevation={4}
                      >
                        <Typography variant="caption">Dias jogando</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4} className={classes.gaugeCard}>
                      <div
                        className={`${classes.gauge} ${classes.gaugeColor3}`}
                      >
                        {getNat5PerDay(
                          player.natFiveOwned,
                          player.creationDate
                        )}
                      </div>
                      <Paper className={classes.gaugeCaption} elevation={4}>
                        <Typography variant="caption">Nat 5/dia</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
