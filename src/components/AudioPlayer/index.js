import React, { useContext } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import ReactAudioPlayer from "react-audio-player";
import music from "../../../src/Audio/YOUNGOHM - อศวนรตตกาล ft. DIAMOND MQT (Official Audio).mp3";
import { useLocation } from "react-router-dom";
import { GolbalContext } from "../../App";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function AudioPlayer() {
  const {state} = useContext(GolbalContext);
  console.log(`Play with URL : ${state.audioURL}`);
  const location = useLocation();
  // const music = location.state.music;
  // const classes = useStyles();

  return (
    <div>
      <Grid item>
        <ReactAudioPlayer src={state.audioURL} autoPlay controls />
      </Grid>
    </div>
  );
}
