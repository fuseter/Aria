import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import swal from "sweetalert";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import Page from "../../../src/components/Page";
import AlbumIcon from "@material-ui/icons/Album";

import firebase from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
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
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
  input: {
    display: "none",
  },
}));

const Upload = () => {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [music, setmusic] = useState(null);
  const [CurUser, setCurUser] = useState(null);
  let [MusicID, setMusicID] = useState(1);

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

  const handleUploadmusic = () => {
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
              .ref(
                "users/" +
                  firebase.auth().currentUser.uid +
                  "/cover" +
                  `/${MusicID}`
              )
              .set({
                MusicURL: url,
              })
              .then((setMusicID = MusicID++));
          });
      }
    );
  };

  const handleUpload = () => {
    const uploadTask = firebase
      .storage()
      .ref(`MusicImages/${image.name}`)
      .put(image);

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
          .ref("MusicImages")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log("url => ", url);
          });
      }
    );
  };
  const upLoadAll = () => {
    handleUploadmusic();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurUser(user);
      } else {
        setCurUser(null);
      }
    });
  }, []);

  return (
    <Page className={classes.root} title="UploadMusic">
      <Container maxWidth={false}>
        <Grid
          alignItems="flex-end"
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
              color="textPrimary"
            >
              Upload Music
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              color="textPrimary"
              className={classes.current}
            >
              อัพโหลดเพลง
            </Typography>
            <hr
              style={{
                color: "#FF0A6C",
                height: 2.5,
                backgroundColor: "#FF0A6C",
                borderWidth: 0,
                width: "110%",
                borderRadius: 10,
              }}
            ></hr>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.paper}>
              <CardContent>
                <Grid container spacing={3}>
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
                  {/* <Grid item md={12}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        startIcon={<AddAPhotoIcon />}
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        อัพโหลดปกเพลง
                      </Button>
                    </label>
                  </Grid> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    <TextField
                      id="outlined-basic"
                      label="ชื่อเพลง"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      id="outlined-basic"
                      label="ประเภทของเพลง"
                      variant="outlined"
                      fullWidth
                    />
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
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      id="outlined-basic"
                      label="ชื่อศิลปินต้นฉบับเพลง"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12} style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      startIcon={<AlbumIcon />}
                      onClick={upLoadAll}
                    >
                      อัพโหลดเพลง
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Upload;
