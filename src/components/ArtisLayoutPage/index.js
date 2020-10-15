import React, { useState, Component, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid, List } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../../../src/firebase/index";
import iconPlay from "../../../src/images/play-button.png";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginLeft: "25%",
    marginRight: "25%",
    marginTop: "100px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "200px",
    height: "200px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  time: {
    float: "right",
    color: "#999999",
  },
  active: {
    background: "#efefef",
  },
}));

const song = [
  {
    name: "Blessing it",
    author: "Lal",
    time: "3:24",
  },
  {
    name: "Horn in the middle",
    author: "Sos",
    time: "4:09",
  },
  {
    name: "Lady Brown",
    author: "Zus",
    time: "3:19",
  },
  {
    name: "Kumomi",
    author: "Amit",
    time: "3:54",
  },
  {
    name: "High 2 lows",
    author: "Pucy",
    time: "4:38",
  },
];
export default function Category() {
  const classes = useStyles();
  const theme = useTheme();
  const [CurUser, setCurUser] = useState(null);
  const [couter, setcouter] = useState(0)
  const location = useLocation();
  const artis = location.state.artis;
  console.log("เข้า forloop => ",couter)






  console.log("ค่าที่ส่งมาจากLink =>", artis);

  const clg = () => {
    console.log("click => button play");
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
      } else setCurUser(null);
    });
    // feachMusic();
  }, []);

  // function feachMusic() {
  //   firebase
  //     .database()
  //     .ref("musics/Rock/")
  //     .on(
  //       "value",
  //       (snapshot) => {
  //         let data = [];
  //         snapshot.forEach((snap) => {
  //           data.push(snap.val());
  //         });
  //         setMusicData(data);
  //       },
  //       (errorObject) => {
  //         console.log("The read failed: " + errorObject.code);
  //       }
  //     );
  // }

  return (
    <div>
      {/* Top */}
      <div xs>
        <Card item xs={12}>
          <div
            style={{
              height: "250px",
              marginTop: "64px",
            }}
          >
            <Card className={classes.root}>
              <CardMedia
                className={classes.cover}
                image="https://yt3.ggpht.com/Hzg8rsufWyw8ekK0NguBDH8l4mjRGd0IhLdrITxgDu9hnV36xOUsB3w7ta0S8OCQiEiOmP_rYw=s900-c-k-c0x00ffffff-no-rj"
                title="Live from space album cover"
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h2" variant="h2">
                    ชื่อประเภท
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Name Catagory
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </div>
        </Card>
      </div>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        component="h4"
        variant="h4"
        className={classes.root}
        style={{ marginTop: "30px" }}
      >
        ลิสต์เพลงทั้งหมด
      </Typography>
      {/* List */}

      <div className={classes.root} style={{ marginTop: "30px" }}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <List>
              {/* map List */}
              {/* {DataArtis.map((res) => ( */}
              <ListItem button>
                <img
                  alt="play"
                  onClick={clg}
                  src={iconPlay}
                  style={{
                    width: "20px",
                    marginRight: "20px",
                  }}
                />
                <ListItemText
                  primary={artis.FirstName}
                  secondary={artis.LastName}
                />
                {/* <span className={classes.time}>{res.MusicURL}</span> */}
              </ListItem>
              {/* ))} */}
            </List>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
