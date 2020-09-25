import React, { useEffect, useState } from "react";
import { Container, makeStyles, Typography, Grid } from "@material-ui/core";
import Page from "../../../src/components/Page";
import firebase from "../../firebase";
import Carousel from "./components/carousel";

const useStyles = makeStyles((theme) => ({
  root: {},
  margin:{
    marginTop: theme.spacing(3)
  }
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
  }, [user])

  return (
    <Page className={classes.root} title="Aria">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.margin}>
            <Carousel />
          </Grid>
        </Grid>
        <Grid>
          
        </Grid>
      </Container>
    </Page>
  );
};

export default Homepage;
