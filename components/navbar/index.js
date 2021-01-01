import { useState, useContext } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Grid,
  Menu,
  MenuItem,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Close from "@material-ui/icons/Close";

import { UserContext } from "../../src/UserContext";
import ResponsiveDrawer from "./drawer";
import Modal from "./modal";
import Login from "../login";
import { red } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "#762f8d",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  login: {},
  logoutButton: {
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  },
}));

const Navbar2 = (props) => {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logged, setLogged } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    setLogged(false);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap className={classes.grow}>
            SW Links
          </Typography>
          {logged ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={classes.login}
            >
              <Typography variant="subtitle2">
                {localStorage.getItem("user")}
              </Typography>
              <IconButton
                size="small"
                className={classes.logoutButton}
                onClick={() => logout()}
              >
                <Close fontSize="small"></Close>
              </IconButton>
            </Box>
          ) : (
            <>
              <IconButton
                color="inherit"
                onClick={() => setShowLogin(!showLogin)}
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Modal show={showLogin} setShow={setShowLogin}>
        <Login show={showLogin} setShow={setShowLogin}></Login>
      </Modal>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <ResponsiveDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <ResponsiveDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default Navbar2;
