import React, { useEffect, useState ,Fragment } from "react";
import { Container, makeStyles, Typography, Grid } from "@material-ui/core";
import Page from "../../../src/components/Page";
import firebase from "../../firebase";
import Carousel from "./components/carousel";
import Artis from "./components/Artis";
import Catagory from "./components/Catagory"
import LandingPage from "./components/Landing";
import { BorderAll } from "@material-ui/icons";
// import Player from "./components/Player";
import ReactAudioPlayer from "react-audio-player";
import { useLocation } from "react-router-dom";
import Slider from "../../../src/views/HomePage/components/Slide";
import "../../../src/css/imgBlur.css";
import imgg from "../../../src/images/7.png"


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
      <div style={{
        height: "170px",
        background: `url(${imgg})`
      }} className="blur"></div>
      <Slider />
      <Artis  /> 
      <Catagory />
      
      
    </Page>
    
  );
};

export default Homepage;
