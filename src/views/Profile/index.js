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
import iconPlay from "../../../src/images/play-button.png";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactAudioPlayer from "react-audio-player";
import Player from "../../../src/components/AudioPlayer/index";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

export default function Profile() {
  const classes = useStyles();
  const [CurUser, setCurUser] = useState(null);
  const [CurUsername, setCurUsername] = useState("");
  const [CurLastname, setCurLastrname] = useState("");
  const [UserProfile, setUserProfile] = useState("")
  const [MusicData, setMusicData] = useState([]);
  // const [UserData, setUserData] = useState([]);



  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
        firebase
          .database()
          .ref("/users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            let username = snapshot.val().FirstName || "-";
            let lastname = snapshot.val().LastName || "-";
            let userProfile = snapshot.val().UserProfile || "-";
            setCurUsername(username);
            setCurLastrname(lastname);
            setUserProfile(userProfile)
          });

        // firebase
        //   .database()
        //   .ref("/users/" + user.uid)
        //   .on(
        //     "value",
        //     (snapshot) => {
        //       let UserData = [];
        //       snapshot.forEach((snap) => {
        //         UserData.push(snap.val());
        //       });
        //       setUserData(UserData);
        //     },
        //     (errorObject) => {
        //       console.log("The read failed: " + errorObject.code);
        //     }
        //   );
      } else setCurUser(null);
    });
    feachMymusic();
  }, []);

  function feachMymusic() {
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
            background: `url(${UserProfile})`,
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
            <Avatar alt="" src={UserProfile} className={classes.large} />
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
            {MusicData.map((res, index) => {
              return (
                <div style={{ margin: "20px" }}>
                  <Fragment>
                    {/* <div className="team-area"> */}
                    <div className="sigle-team">
                      <img alt="img1" src={res.ImgMusicURL} />
                      <div className="team-text">
                        <Link to="/" state={{ music: res }}>
                          <img
                            alt="play"
                            // onClick={(e) => console.log("res =>", res)}
                            src={iconPlay}
                          />
                        </Link>
                      </div>
                    </div>
                    {/* </div> */}
                  </Fragment>
                </div>
              );
            })}
          </div>
        </Page>
      </Fragment>
    );
  }
}
