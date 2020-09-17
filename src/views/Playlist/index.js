import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Page from "../../../src/components/Page";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Playlist = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Typography variant="h1" style={{color: '#ffffff'}}>Playlist เด้อ</Typography>
      </Container>
    </Page>
  );
};

export default Playlist;
