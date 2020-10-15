import React, { useState, useEffect, Fragment } from "react";
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
import { Button, Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link, us } from "react-router-dom";
import NextIcon from "@material-ui/icons/ArrowForwardIos";
import firebase from "../../../../firebase";

import img1 from "../../../../../src/images/1.png";
import img2 from "../../../../../src/images/2.png";
import img3 from "../../../../../src/images/3.png";
import img4 from "../../../../../src/images/4.png";
import img5 from "../../../../../src/images/5.png";
import img6 from "../../../../../src/images/6.png";
import img7 from "../../../../../src/images/7.png";
import img8 from "../../../../../src/images/8.png";
import img9 from "../../../../../src/images/9.png";

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
    fontSize: "30px",
    padding: 20,
    paddingLeft: 50,
  },
  Title: {
    fontSize: "22px",
    component: "button",
  },
}));

export default function Category() {
  const classes = useStyles();
  const [CurUser, setCurUser] = useState(null);
  const [ClassicData, setClassicData] = useState([]);
  const [PopData, setPopData] = useState([]);
  const [JazzData, setJazzData] = useState([]);
  const [FolkData, setFolkData] = useState([]);
  const [RBData, setRBData] = useState([]);
  const [RapData, setRapData] = useState([]);
  const [HiphopData, setHiphopData] = useState([]);
  const [RockData, setRockData] = useState([]);
  const [ElecData, setElecData] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
      } else setCurUser(null);
    });
    feachClassic();
    feachPop();
    feachJazz();
    feachFolk();
    feachRB();
    feachRap();
    feachHiphop();
    feachRock();
    feachElectronic();
  }, []);

  // classic data
  function feachClassic() {
    firebase
      .database()
      .ref("musics/Classic/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setClassicData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // Pop data
  function feachPop() {
    firebase
      .database()
      .ref("musics/POP/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setPopData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // Jazz data
  function feachJazz() {
    firebase
      .database()
      .ref("musics/Jazz/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setJazzData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // Folk data
  function feachFolk() {
    firebase
      .database()
      .ref("musics/folk/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setFolkData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // R&B data
  function feachRB() {
    firebase
      .database()
      .ref("musics/R/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setRBData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // Rap data
  function feachRap() {
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
          setRapData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // Hip hop data
  function feachHiphop() {
    firebase
      .database()
      .ref("musics/HipHop/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setHiphopData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // Rock data
  function feachRock() {
    firebase
      .database()
      .ref("musics/Rock/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setRockData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  // Electronic data
  function feachElectronic() {
    firebase
      .database()
      .ref("musics/Electronic/")
      .on(
        "value",
        (snapshot) => {
          let data = [];
          snapshot.forEach((snap) => {
            data.push(snap.val());
          });
          setElecData(data);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  return (
    <div>
      <Link
        to="listcatagory"
        state={{
          music: ClassicData,
          type: "เพลงคลาสสิก",
          img: img1,
          dis: "เพลงที่จะทำให้คุณผ่อนคลายได้ทุกเวลา",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title} style={{ marginTop: 80 }}>
          คลาสสิก
          <NextIcon />
        </Typography>
      </Link>
      <Classic />
      <Link
        to="listcatagory"
        state={{
          music: PopData,
          type: "เพลงป๊อป",
          img: img2,
          dis: "สนุกได้ทุกที่ทุกเวลา",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title}>
          ป๊อป
          <NextIcon />
        </Typography>
      </Link>
      <Pop />

      <Link
        to="listcatagory"
        state={{
          music: JazzData,
          type: "เพลงแจ๊ส",
          img: img3,
          dis: "เต้นได้ไม่ต้องกลัวเหนื่อย",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title}>
          แจ๊ส
          <NextIcon />
        </Typography>
      </Link>
      <Jazz />

      <Link
        to="listcatagory"
        state={{
          music: FolkData,
          type: "เพลงลูกทุ่ง",
          img: img4,
          dis: "เพลิดเพลินไปกับเสียงเพลงสบายๆ",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title}>
          ลูกทุ่ง
          <NextIcon />
        </Typography>
      </Link>
      <Folk />

      <Link
        to="listcatagory"
        state={{
          music: RBData,
          type: "เพลงริทึมแอนด์บลูส์",
          img: img5,
          dis: "หลับตาฟังความรักซึ้งๆพร้อมกับจังหวะที่พอดีกัน",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title}>
          ริทึมแอนด์บลูส์
          <NextIcon />
        </Typography>
      </Link>
      <RB />

      <Link
        to="listcatagory"
        state={{
          music: RapData,
          type: "เพลงแร๊พ",
          img: img6,
          dis: "แร๊พสุดมันกับจังหวะสุดเร้าใจ",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title}>
          แร๊พ
          <NextIcon />
        </Typography>
      </Link>
      <Rap />

      <Link
        to="listcatagory"
        state={{
          music: HiphopData,
          type: "เพลงฮิปฮอป",
          img: img7,
          dis: "จังหวะที่จะทำให้คุณโยกตามไปกับเพลง",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title}>
          ฮิปฮอป
          <NextIcon />
        </Typography>
      </Link>
      <Hiphop />

      <Link
        to="listcatagory"
        state={{
          music: RockData,
          type: "เพลงร๊อก",
          img: img8,
          dis: "ตะโกนไปพร้อมกับเพลงให้สุดเสียง",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title}>
          ร๊อก
          <NextIcon />
        </Typography>
      </Link>
      <Rock />

      <Link
        to="listcatagory"
        state={{
          music: ElecData,
          type: "เพลงอิเล็กโทรนิค",
          img: img9,
          dis: "เต้นไปกับพลงไม่มีเนื้อร้องก็ทำให้คุณสนุกได้",
        }}
        className={classes.sectionTitle}
      >
        <Typography className={classes.Title}>
          อิเล็กโทรนิค
          <NextIcon />
        </Typography>
      </Link>
      <Electronic />
    </div>
  );
}
