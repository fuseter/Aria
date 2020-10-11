import React, { useState, useEffect, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Page from "../../../src/components/Page";
import bgLogin from "../../../src/images/BG.png";
import { useNavigate } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import firebase from "../../firebase";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import img from "../../../src/images/download.jpg";
import bgimage from "../../../src/images/Artboard.png";
import "../../../src/css/imgBlur.css";

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
            setCurUsername(username);
            setCurLastrname(lastname);
          });
      } else setCurUser(null);
    });
  }, []);

  return (
    <Fragment>
      <div
        style={{
          // รูปพื้นหลัง
          background: `url(${img})`,
          backgroundSize: "Cover",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          minHeight: "60vh",
          width: "100%",
          zIndex: "-100",
        }}
        className="blur"
      ></div>

      <Page className={classes.root} title="Profile">
        {/* <Card className={classes.bg} variant="outlined"> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // marginTop: 45,
            marginBottom: 20,
          }}
        >
          {/* รูปโปรไฟล์ */}
          <Avatar alt="" src={img} className={classes.large} />
        </div>
        {/* <CardContent> */}
        <Grid container maxWidth="xs">
          <Grid item xs={12} sm={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "left",
                marginRight: 15,
                fontSize: 40,
                color: "#fff",
              }}
            >
              {CurUsername} {/* ชื่อจริง */}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "right",
                marginLeft: 15,
                fontSize: 40,
                color: "#fff",
              }}
            >
              {CurLastname} {/* นามสกุล */}
            </div>
          </Grid>
        </Grid>
        {/* </CardContent> */}

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
            marginTop: 45,
            marginBottom: 35,
            color: "#fff",
          }}
        >
          เพลงของฉัน
        </div>
        {/* </Card> */}
      </Page>
    </Fragment>
  );
}
