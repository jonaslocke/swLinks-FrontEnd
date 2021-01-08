import { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import AddBoxIcon from "@material-ui/icons/AddBox";

import SubTitle from "../../components/subTitle";
import AddPlayer from "./addPlayer";

import { PlayersContext } from "../../src/PlayersContext";
import PlayerCard from "./playerCard";

const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players`;

const useStyles = makeStyles((theme) => ({
  list: { marginTop: 20 },
  addButton: {
    color: "#cb7be6",
  },
}));

export default function Players() {
  const classes = useStyles();
  const [playersList, setPlayersList] = useState([]);
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  const fetchData = async () => {
    const result = await axios(api);
    setPlayersList(result.data);
  };

  useEffect(() => {
    fetchData();
    console.warn("👍 rendered!");
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        fetchData,
      }}
    >
      <Grid container alignItems="flex-end" justify="space-between">
        <Grid item>
          <SubTitle title="Jogadores">
            <SportsEsportsIcon fontSize="large" />
          </SubTitle>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setShowAddPlayer(!showAddPlayer)}>
            <AddBoxIcon className={classes.addButton} />
          </IconButton>
        </Grid>
      </Grid>
      <AddPlayer show={showAddPlayer}></AddPlayer>
      <Grid container spacing={4} className={classes.list}>
        {playersList.map((player, id) => {
          return <PlayerCard data={player} key={id}></PlayerCard>;
        })}
      </Grid>
    </PlayersContext.Provider>
  );
}
