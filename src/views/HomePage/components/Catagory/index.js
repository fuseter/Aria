import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Classic from "./Classic";
import Pop from "./Pop";
import Jazz from "./Jazz";
import Folk from "./Flolk";
import RB from "./RB";
import Rap from "./Rap";
import Hiphop from "./Hiphop";
import Rock from "./Rock";
import Electronic from "./Electronic";
import { Button, Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link,us } from "react-router-dom";
import NextIcon from "@material-ui/icons/ArrowForwardIos";
import firebase from "../../../../firebase";

// import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
  },
  sectionTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    color: "white",
    letterSpacing: "1.25px",
    fontSize: "30px",
    padding: 20,
    paddingLeft: 50,
  },
  Title: {
    fontSize: "22px",
    component: "button",
  },
}));

export default function Category() {
  const classes = useStyles();
  const [CurUser, setCurUser] = useState(null);
  const [MusicData, setMusicData] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
      } else setCurUser(null);
    });
    feachMusic();
  }, []);

  function feachMusic() {
    firebase
      .database()
      .ref("musics/Classic/")
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



  return (
    <div>
      <Link to="listcatagory" state={{music : MusicData}} className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          คลาสสิก
          <NextIcon />
        </Typography>
      </Link>
      <Classic />

      <Link to="listcatagory" className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          ป๊อป
          <NextIcon />
        </Typography>
      </Link>
      <Pop />

      <Link to="listcatagory" className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          แจ๊ส
          <NextIcon />
        </Typography>
      </Link>
      <Jazz />

      <Link to="listcatagory" className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          ลูกทุ่ง
          <NextIcon />
        </Typography>
      </Link>
      <Folk />

      <Link to="listcatagory" className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          ริทึมแอนด์บลูส์
          <NextIcon />
        </Typography>
      </Link>
      <RB />

      <Link to="listcatagory" className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          แร๊พ
          <NextIcon />
        </Typography>
      </Link>
      <Rap />

      <Link to="listcatagory" className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          ฮิปฮอป
          <NextIcon />
        </Typography>
      </Link>
      <Hiphop />

      <Link to="listcatagory" className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          ร๊อก
          <NextIcon />
        </Typography>
      </Link>
      <Rock />

      <Link to="listcatagory" className={classes.sectionTitle}>
        <Typography className={classes.Title}>
          อิเล็กโทรนิค
          <NextIcon />
        </Typography>
      </Link>
      <Electronic />
    </div>
  );
}
