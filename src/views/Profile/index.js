import React, { useState, useEffect, Fragment } from "react";
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

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import img from "../../../src/images/2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  card: {
    opacity: 0.7,
  },
  large: {
    width: 120,
    height: 120,
  },
  button: {
    width: 800,
    height: 50,
  },
  profile: {},
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Profile">
      <Container maxWidth="md">
        <Typography>
          <Card className={classes.card} variant="outlined">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <Avatar alt="" src={img} className={classes.large} />
            </div>

            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <form
                    className={classes.profile}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      label="ชื่อ"
                      variant="outlined"
                      style={{ textAlign: "center" }}
                      fullWidth
                      placeholder="กรอกชื่่อ"
                    />
                  </form>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <form
                    className={classes.profile}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      label="นามสกุล"
                      variant="outlined"
                      style={{ textAlign: "center" }}
                      fullWidth
                      placeholder="กรอกนามสกุล"
                    />
                    
                  </form>
                </Grid>
              </Grid>
            </CardContent>
            <Button 
                //className={classes.button}
                
                fullWidth
                size="large"
                variant="contained" 
                color="primary">
                  ยืนยัน
                </Button>
          </Card>
        </Typography>
      </Container>
    </Page>
  );
}
