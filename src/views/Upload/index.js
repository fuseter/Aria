import React, { useState, useEffect, Fragment } from "react";
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@material-ui/core";
import swal from "sweetalert";
import Lottie from "react-lottie";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Page from "../../../src/components/Page";
import AddIcon from "@material-ui/icons/Add";
import AlbumIcon from "@material-ui/icons/Album";
import PublishIcon from "@material-ui/icons/Publish";
import firebase from "../../firebase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Cover from "../../../src/images/cover.png";
import bgupload from "../../../src/images/nblur.png";
import loadanimation from "../../../src/lottie/music-animation.json";
import "../../css/imgBlur.css";
import { AlignCenter } from "react-feather";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(9),
    // "& label.Mui-focused": {
    //   color: "white",
    // },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#5A5D63",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FF0A6C",
      },
    },
    position: "relative",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
  input: {
    display: "none",
  },
  large: {
    width: 150,
    height: 150,
  },
}));

const Upload = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [CurUser, setCurUser] = useState(null);
  const [Progressimg, setProgressimg] = useState(0);
  const [CurUsername, setCurUsername] = useState("");

  //Upload
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [music, setmusic] = useState(null);

  //musicDetail
  const [MusicName, setMusicName] = useState("");
  const [MusicGenre, setMusicGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [Artist, setArtist] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleChangemusic = (e) => {
    if (e.target.files[0]) {
      setmusic(e.target.files[0]);
    }
  };

  function handleUploadmusic() {
    //img
    const uploadTaskimg = firebase
      .storage()
      .ref(`MusicImages/${image.name}`)
      .put(image);
    uploadTaskimg.on(
      "state_changed",
      (snapshot) => {
        const progressIMG = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressimg(progressIMG);
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("MusicImages")
          .child(image.name)
          .getDownloadURL()
          .then((imgurl) => {
            setTimeout(musicup(imgurl), 3000);
          });
      }
    );
  }

  function musicup(imgurl) {
    const uploadTask = firebase
      .storage()
      .ref(`Music/${music.name}`)
      .put(music);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("Music")
          .child(music.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            firebase
              .database()
              .ref("musics/" + MusicGenre)
              .push()
              .set({
                MusicURL: url,
                ImgMusicURL: imgurl,
                MusicName: MusicName,
                Description: Description,
                Artist: Artist,
                CoverBy: CurUsername,
              });
            putMycover(
              url,
              imgurl,
              MusicName,
              Description,
              Artist,
              CurUsername
            );
          });
      }
    );
  }

  function putMycover(
    url,
    imgurl,
    MusicName,
    Description,
    Artist,
    CurUsername
  ) {
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/covers")
      .push()
      .set({
        MusicURL: url,
        ImgMusicURL: imgurl,
        MusicName: MusicName,
        Description: Description,
        Artist: Artist,
        CoverBy: CurUsername,
      }).then(
        swal({
          title: "อัพโหลดเพลงสำเร็จแล้ว",
          text: "  ",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          button: false,
        }).then(() => {
          setTimeout(() => {
            navigate("../profile");
          }, 500);
        })
      );
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
        firebase
          .database()
          .ref("/users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            let username = snapshot.val().FirstName || "-";
            setCurUsername(username);
          });
      } else {
        setCurUser(null);
      }
    });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Fragment>
      <div
        style={{
          background: `url(${bgupload})`,
          minHeight: "100vh",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
        }}
        className="blur"
      ></div>

      <Page className={classes.root} title="UploadMusic">
        <Container maxWidth={false}>
          <Grid alignItems="center" container justify="center" spacing={3}>
            <Grid item>
              <Typography
                component="h1"
                variant="h4"
                color="textPrimary"
                className={classes.current}
                style={{ marginTop: 40, textAlign: "center" }}
              >
                อัพโหลดเพลง Cover ของคุณ
              </Typography>
              <Typography
                component="h1"
                color="textPrimary"
                className={classes.current}
                style={{
                  marginTop: 14,
                  fontSize: 13.8,
                  color: "#bcbcbc",
                  textAlign: "center",
                }}
              >
                แบ่งปันเพลงต่างๆในเวอร์ชั่นของคุณให้คนอื่นใน Aria ฟังดูสิ!
                อัปโหลดเพลงของคุณตอนนี้เลย!
              </Typography>
            </Grid>
          </Grid>
          <Grid alignItems="center" container justify="center" spacing={3}>
            {/* <Grid item xs={12} sm={6}>
              <Card className={classes.paper}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <Avatar
                        src={image ? URL.createObjectURL(image) : null}
                        alt={image ? image.name : null}
                        className={classes.large}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <input
                        // accept="image/*"
                        className={classes.input}
                        id="contained-button-files"
                        multiple
                        type="file"
                        onChange={handleChange}
                      />
                      <label htmlFor="contained-button-files">
                        <Button
                          startIcon={<AddAPhotoIcon />}
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          อัพโหลดปกเพลง
                        </Button>
                      </label>
                    </Grid>
                    <Grid item md={12}>
                      <input
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleChangemusic}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          startIcon={<AddAPhotoIcon />}
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          อัพโหลดเพลง
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid> */}
            <Grid item xs={12} sm={6} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid container spacing={3}>
                      <Grid
                        item
                        xs={12}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          marginTop: 15,
                        }}
                      >
                        <Avatar
                          src={image ? URL.createObjectURL(image) : null}
                          alt={image ? image.name : null}
                          className={classes.large}
                        />
                      </Grid>


                      <Grid item xs={12} style={{ textAlign: "center" }}>
                        <input
                          // accept="image/*"
                          className={classes.input}
                          id="contained-button-files"
                          multiple
                          type="file"
                          onChange={handleChange}
                        />
                        <label htmlFor="contained-button-files">
                          <Button
                            startIcon={<AddAPhotoIcon />}
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            อัพโหลดปกเพลง
                          </Button>
                        </label>
                      </Grid>


                      <Grid
                        item
                        xs={12}
                        style={{ textAlign: "center", marginBottom: 10 }}
                      >
                        <div>
                          <Lottie
                            options={defaultOptions}
                            height={150}
                            width={150}
                            style={{ marginBottom: 30 }}
                          />
                        </div>
                        <Typography style={{margin:10}}>
                          {music ? music.name : null}
                        </Typography>
                        <input
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handleChangemusic}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            startIcon={<PublishIcon />}
                            variant="contained"
                            color="primary"
                            component="span"
                            style={{ textAlign: "center", marginBottom: 30 }}
                          >
                            อัพโหลดเพลง
                          </Button>
                        </label>
                        
                        <div>รายละเอียดเพลง<hr style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}></hr></div>
                      </Grid>
                    </Grid>
                    <Grid item md={12}>
                      <TextField
                        id="outlined-basic"
                        label="ชื่อเพลง"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setMusicName(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.textFieldPosition}
                        fullWidth
                      >
                        <InputLabel>แนวเพลง</InputLabel>
                        <Select
                          native
                          value={MusicGenre}
                          onChange={(e) => setMusicGenre(e.target.value)}
                          label="แนวเพลง"
                          inputProps={{
                            name: "MusicGenre",
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value={"Classic"}>คลาสสิก (Classic)</option>
                          <option value={"POP"}>ป๊อป (POP)</option>
                          <option value={"Jazz"}>แจ๊ส (Jazz)</option>
                          <option value={"folk"}>ลูกทุ่ง (folk)</option>
                          <option value={"R&B"}>ริทึมแอนด์บลูส์ (R&B)</option>
                          <option value={"Rap"}>แร็พ (Rap)</option>
                          <option value={"HipHop"}>ฮิปฮอป (Hip hop)</option>
                          <option value={"Rock"}>ร็อก (Rock)</option>
                          <option value={"Electronic"}>
                            อิเล็คโทรนิค (Electronic)
                          </option>
                          <option value={"etc"}>อื่นๆ</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={12}>
                      <TextField
                        id="outlined-multiline-static"
                        label="คำอธิบาย"
                        multiline
                        fullWidth
                        rows={4}
                        variant="outlined"
                        placeholder="เพิ่มคำอธิบายเพลงของคุณ"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <TextField
                        id="outlined-basics"
                        label="ชื่อศิลปินต้นฉบับเพลง"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setArtist(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={12} style={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleUploadmusic}
                      >
                        ตกลง
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </Fragment>
  );
};

export default Upload;
