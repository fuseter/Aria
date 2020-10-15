import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import playerStyles  from "./scss/Player.scss";

const useStyles = makeStyles((_theme) => ({
  root: {},
}));

const panelEle = document.querySelector(".info");
const playEle = document.querySelector(".controller__button_play");
const diskEle = document.querySelector(".disk");
const progressEle = document.querySelector(".info__panel_progress");
let initState = true;

progressEle.addEventListener("animationiteration", (e) => {
  panelEle.classList.remove("info--active");
  diskEle.classList.remove("disk--active");
  playEle.classList.remove("controller__button_play--active");
  playEle.classList.add("controller__button_play--stop");
  diskEle.classList.add("disk--stop");
});

function togglePlay() {
  playEle.classList.toggle("controller__button_play--active");
  diskEle.classList.toggle("disk--active");
  panelEle.classList.toggle("info--active");

  if (initState) {
    initState = false;
    return;
  }

  playEle.classList.toggle("controller__button_play--stop");
  diskEle.classList.toggle("disk--stop");
}

export default function Palyer() {
  const classes = useStyles();
  const Play = togglePlay();

  return (
    <div className={playerStyles.player}>
      <div className={playerStyles.info}>
        <div className={playerStyles.info_panel}>
          <h5>It Was A Good Day</h5>
          <p>Ice Cube</p>
          <div className={playerStyles.info_panel__progress}>
            <div className="info__panel_progress--runner"></div>
          </div>
        </div>
      </div>
      <div className={playerStyles.disk}></div>
      <div className={playerStyles.controller}>
        <div className={playerStyles.controller__button,playerStyles.controller__button_backward}></div>
        <div
          onclick={Play}
          className={playerStyles.controller__button,playerStyles.controller__button_play}
        ></div>
        <div className={playerStyles.controller__button,playerStyles.controller__button_forward}></div>
      </div>
    </div>
  );
}
