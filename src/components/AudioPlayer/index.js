import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import ReactAudioPlayer from "react-audio-player";
import music from "../../../src/Audio/YOUNGOHM - อศวนรตตกาล ft. DIAMOND MQT (Official Audio).mp3";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function AudioPlayer(audio) {
  const location = useLocation();
  // const music = location.state.music;
  // const classes = useStyles();

  
  return (
    <div>
      <Grid item>
        <ReactAudioPlayer  src={audio} autoPlay controls />
      </Grid>
    </div>
  );
}
