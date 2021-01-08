import { Grid, Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const CardGauge = ({ number, label, variant, large }) => {
  let gradient = [];
  switch (variant) {
    case 1:
      gradient = ["#8D2F2F", "#FF5F5F"];
      break;
    case 2:
      gradient = ["#2F8D82", "#96ECE2"];
      break;
    case 3:
      gradient = ["#4D2F8D", "#A881FB"];
      break;
    case 4:
      gradient = ["#D38312", "#A83279"];
      break;
    default:
      gradient = ["#8D2F2F", "#FF5F5F"];
  }

  const useStyles = makeStyles((theme) => ({
    gaugeCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
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
    gaugeCaptionMiddle: {
      width: "120%",
    },
    gaugeColor: {
      backgroundImage: `linear-gradient(#424242, #424242), radial-gradient(circle at top left, ${gradient[0]}, ${gradient[1]})`,
    },
    gaugeCaption: {
      marginTop: 22,
      padding: 10,
      textAlign: "center",
    },
  }));
  const classes = useStyles();
  return (
    <Grid item xs={4} className={classes.gaugeCard}>
      <div className={`${classes.gauge} ${classes.gaugeColor}`}>{number}</div>
      <Paper
        className={`${classes.gaugeCaption} ${
          large ? classes.gaugeCaptionMiddle : ""
        }`}
        elevation={4}
      >
        <Typography variant="caption">{label}</Typography>
      </Paper>
    </Grid>
  );
};

export default CardGauge;
