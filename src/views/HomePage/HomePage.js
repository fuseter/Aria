import React, { useEffect, useState } from "react";
import { Container, makeStyles, Typography, Grid } from "@material-ui/core";
import Page from "../../../src/components/Page";
import firebase from "../../firebase";
import Carousel from "./components/carousel";
import Artis from "./components/Artis";
import Catagory from "./components/Catagory"
import LandingPage from "./components/Landing";
import { BorderAll } from "@material-ui/icons";
// import Player from "./components/Player";
import Footer from "../../layouts/Footer";

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginTop: theme.spacing(3),
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const [CurrentUser, setCurrentUser] = useState(null);
  const [Email, setEmail] = useState("");

  console.log("Currentuser => ", CurrentUser);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser("");
    }
  });

  var user = firebase.auth().currentUser;

  useEffect(() => {
    if (user !== null) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <Page className={classes.root} title="Aria">
      {/* <LandingPage /> */}
      <Carousel />
      <Artis />
      <Catagory />
      {/* <LandingPage /> */}
      <Footer/>
    </Page>
    
  );
};

export default Homepage;
