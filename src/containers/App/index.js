import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider } from "@material-ui/core";

import config from "../../config";
import Router from "./Router";
import auth from "../../auth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
  },
}));

function App() {
  const classes = useStyles();
  const [authConfig, setAuthConfig] = useState(false);
  useEffect(() => {
    config();
  }, []);

  const authConfigHandler = () => {
    setAuthConfig(true);
  };

  auth(authConfigHandler);

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        {authConfig && (
          <BrowserRouter>
            <Header />
            <Router />
            <Footer />
          </BrowserRouter>
        )}
      </MuiThemeProvider>
    </div>
  );
}

export default App;
