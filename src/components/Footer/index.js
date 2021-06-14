import { Button, makeStyles } from "@material-ui/core";
import React from "react";

import Banner from "../Common/banner.png";
import Logo from "../Common/logo.png";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    borderTop: "1px solid rgba(128,128,128, 0.3)",
    background: "#FFFAF8",
  },
  footer: {
    width: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  img: {
    maxWidth: 40,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 30,
      // maxHeight: 75,
    },
  },
  button: {
    color: "black",
    "&:hover": {
      backgroundColor: "#DDE88B",
      borderColor: "#DDE88B",
      color: "black",
      boxShadow: "none",
    },
  },
}));

const Footer = () => {
  const classes = useStyle();

  const hrefHandler = () => {
    window.open("https://github.com/DevooKim?tab=repositories");
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.footer}>
          <div>
            <a href={`${window.location.protocol}//${window.location.host}`}>
              {/* <img className={classes.img} src={Banner} alt="" /> */}
              <img className={classes.img} src={Logo} alt="" />
            </a>
          </div>
          <Button className={classes.button} onClick={hrefHandler}>
            contact
          </Button>
        </div>
      </div>
    </>
  );
};

export default Footer;
