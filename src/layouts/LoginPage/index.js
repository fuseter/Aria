import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Page from "../../../src/components/Page";
import bgLogin from "../../../src/images/BG.png";
import { useNavigate } from "react-router-dom";

import firebase from "../../firebase";

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
    marginTop: theme.spacing(20),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fromposition: {
    marginTop: theme.spacing(15),
    alignItems: "center",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [CurrentUser, setCurrentUser] = useState(null);

  console.log("Email => ", Email);
  console.log("Password => ", Password);
  console.log("Currentuser => ", CurrentUser);

  // useEffect(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser("");
    }
  });
  // }, []);

  function Login(event) {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(Email, Password)
      .then((res) => {
        setCurrentUser(res);
        if (res) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error => ", error);
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
      <Page className={classes.root} title="Login">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ textAlign: "center" }}
            >
              เข้าสู่ระบบ
            </Typography>
            <form className={classes.form} onSubmit={Login} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                label="อีเมลล์"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={classes.submit}
              >
                เข้าสู่ระบบ
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="auth/register" variant="body2">
                    {"ยังไม่มีบัญชีผู้ใช้ ? ลงทะเบียน"}
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
