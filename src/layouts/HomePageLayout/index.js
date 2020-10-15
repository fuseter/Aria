import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Nav from "./NavBar";
import Footer from "../Footer"
const useStyles = makeStyles((theme) => ({
  // root: {
  //   backgroundColor: theme.palette.background.dark,
  // },
}));

const MainLayout = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Nav />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
