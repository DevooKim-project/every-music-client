import { Button, makeStyles } from "@material-ui/core";
import React from "react";

import Logo from "../../Images/logo.png";

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
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  img: {
    maxWidth: 40,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 30,
    },
  },
  a: {
    flexGrow: 2,
    textAlign: "center",
  },
  button: {
    flexGrow: 1,
    textAlign: "center",
    color: "black",
    "&:hover": {
      backgroundColor: "#DDE88B",
      borderColor: "#DDE88B",
      color: "black",
      boxShadow: "none",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
}));

const Footer = () => {
  const classes = useStyle();

  const contactHandler = () => {
    window.open("https://github.com/DevooKim/everymusic.devookim.com/issues");
  };
  const policyHandler = () => {
    window.open(
      "https://www.notion.so/Privacy-Policy-Every-Music-230f4b2be7264f61b9ec80f7bca2630d"
    );
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.footer}>
          <a className={classes.a} href={`${window.location.protocol}//${window.location.host}`}>
            <img className={classes.img} src={Logo} alt="" />
          </a>
          <Button className={classes.button} onClick={contactHandler}>
            contact
          </Button>
          <Button className={classes.button} onClick={policyHandler}>
            privacy policy
          </Button>
        </div>
      </div>
    </>
  );
};

export default Footer;
