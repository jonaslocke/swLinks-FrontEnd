import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 6,
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "#762f8d",
    },
    drawerDesktop: {
      width: 300,
      marginTop: 64,
    },
    drawerMobile: {
      width: "100vw",
      height: "100vh",
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    console.log(isMobile);
  }, []);

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon onClick={() => setDrawerOpen(!drawerOpen)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SW Links
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        classes={
          isMobile
            ? {
                paper: classes.drawerMobile,
              }
            : {
                paper: classes.drawerDesktop,
              }
        }
        anchor="left"
        open={drawerOpen}
      >
        <List>
          <ListItem onClick={() => setDrawerOpen(!drawerOpen)}>
            <ListItemIcon>
              <Close />
            </ListItemIcon>
            <ListItemText primary={" "} />
          </ListItem>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
