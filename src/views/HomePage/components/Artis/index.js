import React, { useState, useEffect, Fragment } from "react";

import SwiperCore, { Pagination } from "swiper";
import { makeStyles } from "@material-ui/core/styles";
import iconPlay from "../../../../images/play-button.png";
import "../../../../css/imagesHover.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import firebase from "../../../../firebase";

import img1 from "../../../../images/1.png";
import img2 from "../../../../images/2.png";
import img3 from "../../../../images/3.png";
import img4 from "../../../../images/4.png";
import img5 from "../../../../images/5.png";
import img6 from "../../../../images/6.png";
import img7 from "../../../../images/7.png";

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
    fontSize: "25px",
  },
}));

const tile = [
  {
    img: img1,
    title: "Image",
    author: "author",
  },
  {
    img: img2,
    title: "Image",
    author: "author",
  },
  {
    img: img3,
    title: "Image",
    author: "author",
  },
  {
    img: img4,
    title: "Image",
    author: "author",
  },
  {
    img: img5,
    title: "Image",
    author: "author",
  },
  {
    img: img6,
    title: "Image",
    author: "author",
  },
  {
    img: img7,
    title: "Image",
    author: "author",
  },
];

export default function Artis() {
  const classes = useStyles();
  const [CurUser, setCurUser] = useState(null);
  const [Artis, setArtis] = useState([]);
  const [key, setkey] = useState(1)



  const clg = () => {
    console.log("click => button play");
  };

  useEffect(() => {
     firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
      } else setCurUser(null);
    });
    feachArtis();
  }, []);

  function feachArtis() {
    firebase
      .database()
      .ref("/users")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setArtis(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  return (
    <div>
      <div
        className={classes.sectionTitle}
        style={{
          padding: 20,
          paddingLeft: 50,
          marginTop:70
        }}
      >
        ศิลปิน
      </div>
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
            // 150: {
            //   slidesPerView: 1,
            //   spaceBetween: 10,
            // },
            // 768: {
            //   slidesPerView: 5,
            //   spaceBetween: 50,
            // },
            1024: {
              slidesPerView: 7,
              spaceBetween: 70,
            },
          }}
        >
          {Artis.map((res) => (
            <SwiperSlide>
              <div className="sigle-team" key={res.FirstName}>
                <img alt="img1" src={res.UserProfile} />
                <div className="team-text">
                  <img alt="play" onClick={clg} src={iconPlay} />
                </div>
              </div>
              <div style={{ margin: 10, color: "grey" }}>
                {res.FirstName} {res.LastName}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
