import React, { useEffect, useState } from "react";
import { Container, makeStyles, Typography, Grid } from "@material-ui/core";
import Page from "../../../src/components/Page";
import firebase from "../../firebase";
import Carousel from "./components/carousel";
import LandingPage from "./components/Landing";
import ReactAudioPlayer from "react-audio-player";
import { useLocation } from "react-router-dom";
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
  // const location = useLocation();
  // const music = location.state.music;



  // console.log("เพลงที่ส่งมา => ", music);



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
      <Grid item style={{ marginTop: 200 }}>
        {/* <ReactAudioPlayer src={music.MusicURL} autoPlay controls /> */}
      </Grid>
      <LandingPage />
      <Footer/>
    </Page>
    
  );
};

export default Homepage;
