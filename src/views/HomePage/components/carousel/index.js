import React from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@material-ui/core/styles";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import img1 from "../../../../images/1.png";
import img2 from "../../../../images/2.png";
import img3 from "../../../../images/3.png";
import img4 from "../../../../images/4.png";
import img5 from "../../../../images/5.png";
import img6 from "../../../../images/6.png";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Carousel = () => {
  // const classes = useStyles();

  return (
    <Swiper
      spaceBetween={50}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      scrollbar={{
        el: ".swiper-scrollbar",
        hide: true,
      }}
      pagination={{
        el: ".swiper-pagination",
        type: "progressbar",
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      // navigation
      // pagination={{ el: ".swiper-pagination", dynamicBullets: true }}
    >
      <SwiperSlide>
        <img alt="img1" src={img1} />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="img2" src={img2} />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="img3" src={img3} />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="img4" src={img4} />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="img5" src={img5} />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="img6" src={img6} />
      </SwiperSlide>

      <div className="swiper-pagination swiper-pagination-black"></div>
      <div className="swiper-button-next swiper-button-white"></div>
      <div className="swiper-button-prev swiper-button-white"></div>
      
    </Swiper>
  );
};

export default Carousel;
