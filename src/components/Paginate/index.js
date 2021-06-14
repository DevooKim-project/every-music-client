import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  paginate: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    color: "#DDE88B",
  },
}));

const Paginate = ({ defaultPage, currentPageHandler, totalPages }) => {
  const classes = useStyles();
  console.log(defaultPage);
  return (
    <div className={classes.root}>
      <Pagination
        className={classes.paginate}
        count={totalPages}
        defaultPage={parseInt(defaultPage)}
        onChange={currentPageHandler}
        size="large"
      />
    </div>
  );
};

export default Paginate;
