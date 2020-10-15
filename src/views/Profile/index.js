import React, { useState, useEffect, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Page from "../../../src/components/Page";
import firebase from "../../firebase";

import img from "../../../src/images/download.jpg";
import "../../../src/css/imgBlur.css";
import "../../../src/css/imagesHover.css";
import { Container, Typography } from "@material-ui/core";

//test
import img1 from "../../../src/images/modern-music-event-poster-template_1361-1292.jpg";
import img2 from "../../../src/images/music-event-poster-template-with-colorful-shapes_1361-1591.jpg";

import iconPlay from "../../../src/images/play-button.png";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactAudioPlayer from "react-audio-player";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  card: {
    opacity: 1,
  },
  large: {
    width: 200,
    height: 200,
    marginTop: 70,
  },
  button: {
    width: 800,
    height: 50,
  },
  profile: {},
  bg: {
    position: "relative",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [CurUser, setCurUser] = useState(null);
  const [CurUsername, setCurUsername] = useState("");
  const [CurLastname, setCurLastrname] = useState("");
  const [MusicData, setMusicData] = useState([]);

  console.log("test => ", MusicData);

  const clg = () => {
    console.log("click => button play");
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
        firebase
          .database()
          .ref("/users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            let username = snapshot.val().FirstName || "-";
            let lastname = snapshot.val().LastName || "-";
            setCurUsername(username);
            setCurLastrname(lastname);
          });
      } else setCurUser(null);
    });
    // feachMusics();
    return () => {
      unsubscribe();
    };
    feachUser();
  }, []);

  function feachMusics() {
    // var db = firebase.database();
    // var ref = db.ref("musics/Rock/");
    // let Data = [];
    firebase
      .database()
      .ref("musics/Rock/")
      .on(
        "value",
        (snapshot) => {
          // console.log("res Music =>", snapshot.val());
          // Data.push(snapshot.val());
          setMusicData(snapshot.val());
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // var db = firebase.database();
  // var ref = db.ref("musics/Rock/");
  // let Data = [];

  function feachUser() {
    firebase
      .database()
      .ref("musics/Rock/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setMusicData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  if (CurUser === null) {
    return (
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rect" width={210} height={118} />
      </div>
    );
  } else {
    return (
      <Fragment>
        <div
          style={{
            background: `url(${img})`,
            backgroundSize: "Cover",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            minHeight: "30vh",
            width: "100%",
            zIndex: "-100",
          }}
          className="blur"
        ></div>

        <Page className={classes.root} title="Profile">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Avatar alt="" src={img} className={classes.large} />
          </div>

          <Grid container maxWidth="xs">
            <Grid item xs={12} sm={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 40,
                  color: "#fff",
                }}
              >
                {CurUsername} {CurLastname}
              </div>
            </Grid>
          </Grid>

          <hr
            style={{
              marginLeft: 500,
              marginRight: 500,
              marginTop: 20,
              height: 0.1,
            }}
          ></hr>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 80,
              marginBottom: 35,
              color: "#fff",
              fontSize: 20,
            }}
          >
            {MusicData.map((res) => {
              return (
                <Fragment>
                  <audio style={{ backgroundColor: "#000" }} controls>
                    <source src={res.MusicURL} type="audio/ogg" />
                  </audio>
                  {/* <div className="team-area"> */}
                  <div className="sigle-team">
                    <img alt="img1" src={res.ImgMusicURL} />
                    <div className="team-text">
                      <img alt="play" onClick={clg} src={iconPlay} />
                    </div>
                  </div>
                  {/* </div> */}
                </Fragment>
              );
            })}
          </div>
          {/* 
          <Container>
            <div className="team-area">
              <div className="sigle-team">
                <img alt="img1" src={img1} />
                <div className="team-text">
                  <img alt="play" src={iconPlay} />
                </div>
              </div>
              <div className="sigle-team">
                <img alt="img1" src={img1} />
                <div className="team-text">
                  <h2>fuseter</h2>
                  <p>fff</p>
                  <p>
                    <a href="#">icon</a>
                    <a href="#">icon</a>
                    <a href="#">icon</a>
                  </p>
                </div>
              </div>
              <div className="sigle-team">
                <img alt="img1" src={img1} />
                <div className="team-text">
                  <h2>fuseter</h2>
                  <p>fff</p>
                  <p>
                    <a href="#">icon</a>
                    <a href="#">icon</a>
                    <a href="#">icon</a>
                  </p>
                </div>
              </div>
            </div>
          </Container> */}
        </Page>
        {/* <Footer/> */}
      </Fragment>
    );
  }
}
