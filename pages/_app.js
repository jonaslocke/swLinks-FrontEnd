import { useMemo, useEffect } from "react";
import "../styles/globals.css";
import { useState } from "react";
import { UserContext } from "../src/UserContext";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Navbar from "../components/navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MyApp = ({ Component, pageProps }) => {
  const classes = useStyles();
  const [logged, setLogged] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    if (localStorage.getItem("logged")) {
      setLogged(true);
    }
  }, [logged]);

  return (
    <UserContext.Provider
      value={{
        logged,
        setLogged,
      }}
    >
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Navbar></Navbar>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Component {...pageProps} />
          </main>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default MyApp;
