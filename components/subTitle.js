import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    marginLeft: 15,
  },
}));
export default function SubTitle({ title, children }) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      {children}
      <Typography variant="h4" className={classes.subtitle}>
        {title}
      </Typography>
    </Box>
  );
}
