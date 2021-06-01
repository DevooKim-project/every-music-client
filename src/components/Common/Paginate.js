import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Paginate = ({ defaultPage, currentPageHandler, totalPages }) => {
  const classes = useStyles();
  console.log(defaultPage);
  return (
    <div className={classes.root}>
      <Pagination
        count={totalPages}
        defaultPage={parseInt(defaultPage)}
        onChange={currentPageHandler}
      />
    </div>
  );
};

export default Paginate;
