import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Classic from "./Classic";
import Pop from "./Pop";
import Jazz from "./Jazz";
import Folk from "./Flolk";
import RB from "./RB";
import Rap from "./Rap";
import Hiphop from "./Hiphop";
import Rock from "./Rock";
import Electronic from "./Electronic";
import { Button,  Typography ,Link} from "@material-ui/core";
import NextIcon from "@material-ui/icons/ArrowForwardIos";
// import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
  },
  sectionTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    color: "white",
    letterSpacing: "1.25px",
    fontSize: "25px",
    padding: 20,
    paddingLeft: 50,
  },
}));

export default function Category() {
  const classes = useStyles();

  return (
    <div>
      <Link href="listcatagory" className={classes.sectionTitle}>
        <Typography>คลาสสิก</Typography>
      </Link>
      <Classic />

      <div className={classes.sectionTitle}>ป๊อป</div>
      <Pop />

      <div className={classes.sectionTitle}>แจ๊ส</div>
      <Jazz />

      <div className={classes.sectionTitle}>ลูกทุ่ง</div>
      <Folk />

      <div className={classes.sectionTitle}>ริทึมแอนด์บลูส์</div>
      <RB />

      <div className={classes.sectionTitle}>แร๊พ</div>
      <Rap />

      <div className={classes.sectionTitle}>ฮิปฮอป</div>
      <Hiphop />

      <div className={classes.sectionTitle}>ร๊อก</div>
      <Rock />

      <div className={classes.sectionTitle}>อิเล็กโทรนิค</div>
      <Electronic />
    </div>
  );
}
