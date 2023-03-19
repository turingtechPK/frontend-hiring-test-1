import React from "react";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(81, 78, 244, 0.1)", 
  },
}));

const LoadingScreen = () => {
    const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress color="inherit" />
    </div>
  );
};

export default LoadingScreen;
