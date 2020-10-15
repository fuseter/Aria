import React from "react";

import SwiperCore, { Pagination } from "swiper";

import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Play from "@material-ui/icons/PlayCircleFilled";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import img1 from "../../../../images/1.png";

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
    textTransform: "uppercase",
    color: "grey",
    letterSpacing: "1.25px",
    fontSize: "13.75px",
    marginBottom: "10px",
  },
}));

const tile = [
  {
    img: img1,
    title: "Image",
    author: "author",
  },
  {
    img: img1,
    title: "Image",
    author: "author",
  },
  {
    img: img1,
    title: "Image",
    author: "author",
  },
  {
    img: img1,
    title: "Image",
    author: "author",
  },
  {
    img: img1,
    title: "Image",
    author: "author",
  },
  {
    img: img1,
    title: "Image",
    author: "author",
  },
  {
    img: img1,
    title: "Image",
    author: "author",
  },
];

export default function Artis() {
  const classes = useStyles();
  return (
    <div>
      <h3
        className={classes.sectionTitle}
        style={{
          padding: 20,
          paddingLeft: 50,
        }}
      >
        ARTIS
      </h3>
      <hr
        style={{
          alig: "center",
          marginLeft: "auto",
          marginRight: "auto",
          width: "95%",
          color: "gray",
        }}
      />
      <div
        style={{
          marginLeft: 50,
          marginRight: 50,
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <Swiper
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {tile.map((tile) => (
            <SwiperSlide>
              <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>by: {tile.author}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${tile.title}`}
                      className={classes.icon}
                    >
                      <Play />
                    </IconButton>
                  }
                />
              </GridListTile>
            </SwiperSlide>
          ))}
          ;
        </Swiper>
      </div>
    </div>
  );
}
