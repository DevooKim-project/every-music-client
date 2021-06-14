import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  animation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "18rem",
    verticalAlign: "middle",
  },
  slogan: {
    fontSize: "5rem",
    fontWeight: 700,
  },
  gradient: {
    background: "linear-gradient(to right top,  #6BB55B, #5E5BB5)",
    color: "transparent",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  content: {
    display: "block",
    fontSize: "2rem",
    fontWeight: 600,
  },
}));

const Home = () => {
  const classes = useStyle();
  const [state, setState] = useState(true);
  const EveryMusic = <span className={classes.gradient}>EveryMusic</span>;
  useEffect(() => {
    handler();
  }, []);

  const handler = () => {
    setInterval(() => {
      setState((prev) => {
        return !prev;
      });
    }, [5000]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.animation}>
        {state ? (
          <span className={`${classes.slogan} ${classes.gradient}`}>
            Share
            <br />
            Your
            <br />
            Playlist
          </span>
        ) : (
          <div className={classes.content}>
            <div>다른 사람과 자신의 취향을 공유하세요</div>
            <div>모든 취향이 있는 {EveryMusic}입니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
