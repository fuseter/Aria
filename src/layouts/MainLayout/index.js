import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

import firebase from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [isLoding, setIsLoading] = useState(true);
  const [count, setCount] = useState([]);
  const [a, setA] = useState(0);

  console.log("CurrentUser1 : ", CurrentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });
  });


  


  function Logout(event) {
    event.preventDefault();
    firebase
      .auth()
      .signOut()
      .then((res) => {
        window.location.reload(false);
        setCurrentUser(null);
      });
  }



  if (isLoding) {
    return <h1>Loading ...</h1>;
  } else {
    return (
      <div className={classes.root}>
        <TopBar
          onMobileNavOpen={() => setMobileNavOpen(true)}
          CurrentUser={CurrentUser}
          Logout={Logout}
        />
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardLayout;
