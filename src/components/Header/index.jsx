import React, { Fragment, useContext } from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import Banner from "../Common/banner.png";
import Logo from "../Common/logo.png";
import Navigation from "../Navigation";
import User from "../User";
import { Context } from "../../context";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "hsla(0,0%,100%,.6)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(128,128,128, 0.3)",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  },
  toolbar: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "650px",
      flexDirection: "column",
      alignItems: "stretch",
      // paddingBottom: theme.spacing(0),
    },
  },
  logo: {
    flexGrow: 0.5,
    [theme.breakpoints.down("sm")]: {
      flexGrow: 3,
    },
  },
  navigation: {
    flexGrow: 2,
  },
  user: {
    flexGrow: 0.5,
    display: "flex",
    justifyContent: "flex-end",
  },
  img: {
    maxWidth: 50,
    // maxHeight: 150,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 30,
      // maxHeight: 75,
    },
    display: "block",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  mobileTop: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Header = (props) => {
  const classes = useStyles();
  const {
    state: { payload },
  } = useContext(Context);
  return (
    <Fragment>
      {/* <CssBaseline /> */}
      <ElevationScroll {...props}>
        <AppBar className={classes.appBar}>
          <div className={classes.sectionDesktop}>
            <div className={classes.toolbar}>
              <div className={classes.logo}>
                <a href={`${window.location.protocol}//${window.location.host}`}>
                  {/* <img className={classes.img} src={Banner} alt="" /> */}
                  <img className={classes.img} src={Logo} alt="" />
                </a>
              </div>
              <div className={classes.navigation}>
                <Navigation />
              </div>
              <div className={classes.user}>
                <User payload={payload} />
              </div>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <div className={classes.toolbar}>
              <div className={classes.mobileTop}>
                <div className={classes.logo}>
                  <a href={`${window.location.protocol}//${window.location.host}`}>
                    {/* <img className={classes.img} src={Banner} alt="" /> */}
                    <img className={classes.img} src={Logo} alt="" />
                  </a>
                </div>
                <div className={classes.user}>
                  <User payload={payload} />
                </div>
              </div>
              <div className={classes.navigation}>
                <Navigation />
              </div>
            </div>
          </div>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      {props.children}
    </Fragment>
  );
};

export default Header;
