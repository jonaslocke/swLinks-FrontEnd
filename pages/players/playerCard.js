import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import CardGauge from "./cardGauge";

import { PlayersContext } from "../../src/PlayersContext";

const PlayerCard = ({ data }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    avatar: {
      backgroundColor: "#762f8d",
      color: "white",
    },
    menuLabel: {
      marginLeft: theme.spacing(2),
    },
    loadingCard: {
      pointerEvents: "none",
      filter: "grayscale(100%)",
    },
  }));
  const classes = useStyles();

  const router = useRouter();

  const { fetchData } = useContext(PlayersContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [busy, setBusy] = useState(false);
  const open = Boolean(anchorEl);
  const card = useRef();

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

  const deletePlayer = async (id) => {
    setAnchorEl(null);
    setBusy(true);
    const hit = await axios({
      method: "DELETE",
      url: `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players/${id}`,
    });
    fetchData();
  };

  const editPlayer = (id) => {
    setAnchorEl(null);
    router.push(`/players/${id}`);
  };

  const getCardDimensions = () => {
    return {
      width: card.current.offsetWidth,
      height: card.current.offsetHeight,
    };
  };

  return (
    <Grid item xs={12} md={6} lg={4} ref={card}>
      <Card
        className={classes.root}
        className={busy ? classes.loadingCard : null}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.name[0].toUpperCase()}
            </Avatar>
          }
          action={
            <>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => editPlayer(data._id)}>
                  <EditIcon fontSize="small" />
                  <Typography variant={"caption"} className={classes.menuLabel}>
                    Editar
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => deletePlayer(data._id)}>
                  <DeleteIcon fontSize="small" />
                  <Typography variant={"caption"} className={classes.menuLabel}>
                    Deletar
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          }
          title={data.name}
          subheader={`Começou ${data.creationDate}`}
        />

        <CardContent>
          <Grid container spacing={2}>
            <CardGauge
              number={data.natFiveOwned}
              label={"Nat 5"}
              variant={4}
            ></CardGauge>
            <CardGauge
              number={getAccountAge(data.creationDate)}
              label={"Dias jogando"}
              variant={2}
              large
            ></CardGauge>
            <CardGauge
              number={getNat5PerDay(data.natFiveOwned, data.creationDate)}
              label={"Nat 5/Dia"}
              variant={3}
            ></CardGauge>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PlayerCard;
