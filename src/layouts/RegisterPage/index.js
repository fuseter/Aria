import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Page from "../../../src/components/Page";
import bgLogin from "../../../src/images/BG.png";
import swal from "sweetalert";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "primary",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary",
      },
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(16),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  space: {
    marginTop: theme.spacing(16),
  },
  margin: {
    position: "absolute",
    marginTop: 70,
  },
  input: {
    display: "none",
  },
  large: {
    width: 150,
    height: 150,
  },
}));

export default function SignUp() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [Progressimg, setProgressimg] = useState(0);
  const [Firstname, setFirstname] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [CurrentUser, setCurrentUser] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
    });
  }, []);

  function UploadProfile(event) {
    event.preventDefault();
    const uploadTaskimg = firebase
      .storage()
      .ref(`UserProfile/${image.name}`)
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
          .ref("UserProfile")
          .child(image.name)
          .getDownloadURL()
          .then((imgurl) => {
            setTimeout(register(imgurl), 3000);
          });
      }
    );
  }

  function register(imgurl) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then((res) => {
        firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid)
          .set({
            FirstName: Firstname,
            LastName: LastName,
            UserProfile: imgurl,
          })
          .then(() => {
            setCurrentUser(res);
            if (res) {
              swal({
                title: "ลงทะเบียนสำเร็จ",
                text: "  ",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                button: false,
              }).then(() => {
                setTimeout(() => {
                  navigate("/");
                }, 500);
              });
            }
          });
      })
      .catch((error) => {
        console.log("error =>", error);
      });
  }

  return (
    <div
      style={{
        background: `url(${bgLogin})`,
        minHeight: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Page className={classes.root} title="Register">
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Grid item lg={12} xs={12}>
            <Link to="/">
              <IconButton aria-label="delete" className={classes.margin}>
                <ArrowBackIcon fontSize="large" color="primary" />
              </IconButton>
            </Link>
          </Grid>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ลงทะเบียน
            </Typography>
            <form className={classes.form} onSubmit={UploadProfile} noValidate>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Avatar
                    src={image ? URL.createObjectURL(image) : null}
                    alt={image ? image.name : null}
                    className={classes.large}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ textAlign: "center", marginBottom: 20 }}
                >
                  <input
                    className={classes.input}
                    id="contained-button-files"
                    multiple
                    type="file"
                    onChange={handleChange}
                  />
                  <label htmlFor="contained-button-files">
                    <Button variant="outlined" component="span">
                      อัพโหลดรูปประจำตัว
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                    fullWidth
                    id="firstName"
                    label="ชื่อ"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    label="นามสกุล"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="อีเมลล์"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    label="รหัสผ่าน"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                ลงทะเบียน
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/auth" variant="body2">
                    <Typography style={{ color: "#FF0A6C" }}>
                      มีบัญชีผู้ใช้งานแล้ว ? เข้าสู่ระบบ
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Page>
    </div>
  );
}
