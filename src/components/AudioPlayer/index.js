import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import ReactAudioPlayer from "react-audio-player";
import music from "../../../src/Audio/YOUNGOHM - อศวนรตตกาล ft. DIAMOND MQT (Official Audio).mp3";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function AudioPlayer() {
  const location = useLocation();
  const music = location.state.music;
  const classes = useStyles();


  console.log("gg  => " , music)




  

  return (
    <div>
      <Grid item>
        <ReactAudioPlayer  autoPlay controls />
      </Grid>
    </div>
  );
}
