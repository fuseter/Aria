import React, { Fragment, useContext } from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import ReactAudioPlayer from "react-audio-player";
import music from "../../../src/Audio/YOUNGOHM - อศวนรตตกาล ft. DIAMOND MQT (Official Audio).mp3";
import { useLocation } from "react-router-dom";
import { GolbalContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function AudioPlayer() {
  const { state } = useContext(GolbalContext);
  console.log(`Play with URL : ${state.audioURL}`);
  const location = useLocation();

  return (
    <div>
      <Grid container>
        <Grid item>
          <div style={{ marginTop: 17, marginRight: 18 }}>
            {state.musicname}
            {state.musicname ? <Fragment> - </Fragment> : <Fragment></Fragment>}
            {state.CoverBy}
          </div>
        </Grid>
        <Grid item>
          <ReactAudioPlayer
            style={{ height: 40, marginRight: 100, marginTop: 7 }}
            src={state.audioURL}
            autoPlay
            controls
          />
        </Grid>
      </Grid>
    </div>
  );
}
