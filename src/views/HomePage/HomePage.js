import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Page from "../../../src/components/Page";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Homepage = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Aria">
      <Container maxWidth={false}>
        <Typography variant="h1" style={{color: '#ffffff'}}>HomePage เด้อ</Typography>
      </Container>
    </Page>
  );
};

export default Homepage;
