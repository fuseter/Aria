import React, { useState, useEffect, Fragment, useContext } from "react";

import SwiperCore, { Pagination } from "swiper";

import { makeStyles } from "@material-ui/core/styles";
import iconPlay from "../../../../images/play-button.png";
import "../../../../css/imagesHover.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { GolbalContext } from "../../../../App";
import firebase from "../../../../firebase";

SwiperCore.use([Pagination]);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 400,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  sectionTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    color: "white",
    letterSpacing: "1.25px",
    fontSize: "30px",
  },
}));


export default function Artis() {
  const classes = useStyles();
  const [CurUser, setCurUser] = useState(null);
  const [MusicData, setMusicData] = useState([]);
  const { dispatch } = useContext(GolbalContext);

  const clg = () => {
    console.log("click => button play");
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
      } else setCurUser(null);
    });
    feachMusic();
  }, []);

  function feachMusic() {
    firebase
      .database()
      .ref("musics/Rap/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setMusicData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  return (
    <div>
      <div
        style={{
          marginLeft: "12.5%",
          marginRight: "12.5%",
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Swiper
          pagination={{
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: true,
            el: ".swiper-pagination",
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 70,
            },
          }}
        >
          {MusicData.map((res) => (
            <SwiperSlide>
              <Fragment>
                <div className="sigle-team">
                  <img alt="img1" src={res.ImgMusicURL} />
                  <div className="team-text">
                    <img alt="play" onClick={() =>
                      dispatch({ type: "SET_URL", payload: res.MusicURL, musicMusicName : res.MusicName, usercoverby : res.CoverBy })
                    } src={iconPlay} />
                  </div>
                </div>
                <div style={{ margin: 10, color: "grey" }}>
                  {res.MusicName} - {res.Artist}
                  <br></br>
                  <span>by: {res.CoverBy}</span>
                </div>
              </Fragment>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
