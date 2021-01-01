import { Divider, List } from "@material-ui/core";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import DialpadIcon from "@material-ui/icons/Dialpad";
import LinkIcon from "@material-ui/icons/Link";
import NavItem from "./navitem";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default function ResponsiveDrawer() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <NavItem
          label={"Jogadores"}
          icon={<SportsEsportsIcon />}
          to={"players"}
        ></NavItem>
        <NavItem
          label={"Calculadoras"}
          icon={<DialpadIcon />}
          to={"calculators"}
        ></NavItem>
        <NavItem label={"Links"} icon={<LinkIcon />} to={"links"}></NavItem>
      </List>
    </div>
  );
}
