import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import page1 from "../../../../images/page1.png";
import page2 from "../../../../images/page2.png";
import page3 from "../../../../images/page3.png";
import page4 from "../../../../images/page4.png";
import page5 from "../../../../images/page5.png";

const useStyles = makeStyles((theme) => ({
  root: {},
  sizes: {
      width:"100%"
  }
}));

export default function Slider() {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "-80px",
      }}
    >
      <Swiper
        pagination={{
          slidesPerView: "auto",
          centeredSlides: true,
          el: ".swiper-pagination",
          clickable: true,
          loop: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
        }}
        autoplay={{
          slidesPerView: "auto",
          delay: 1500,
        }}
        style={{ marginLeft: "100px" , marginRight: "100px" }}
      >
        <SwiperSlide>
          <img className={classes.sizes} alt="page1" src={page1} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={classes.sizes} alt="page2" src={page2} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={classes.sizes} alt="page3" src={page3} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={classes.sizes} alt="page4" src={page4} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={classes.sizes} alt="page5" src={page5} />
        </SwiperSlide>
        <div
          style={{
            marginRight: "50px",
            color: "black",
          }}
          className="swiper-button-next"
        ></div>
        <div
          style={{
            marginLeft: "50px",
            color: "black",
          }}
          className="swiper-button-prev"
        ></div>
      </Swiper>
    </div>
  );
}
