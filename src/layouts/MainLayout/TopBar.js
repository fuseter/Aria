import React, { Fragment, useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Button,
  Typography,
  Grid,
  fade,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../../images/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {
  LogIn as LoginIcon,
  Music as MusicIcon,
  LogOut as LogoutIcon,
} from "react-feather";

import firebase from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
  navbarcolor: {
    backgroundColor: "#101010",
  },
  textcolor: {
    color: "#ffffff",
  },
  space: {
    marginLeft: theme.spacing(2),
  },
  btnupload: {
    marginLeft: theme.spacing(5),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(15),

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));



const TopBar = ({
  className,
  onMobileNavOpen,
  CurrentUser,
  Logout,
  ...rest
}) => {
  const classes = useStyles();
  // const [CurrentUser, setCurrentUser] = useState(null);
  const [Email, setEmail] = useState("");

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     setCurrentUser(user);
  //   } else {
  //     setCurrentUser("");
  //   }
  // });

  // var user = firebase.auth().currentUser;
  // useEffect(() => {
  //   if (user !== null) {
  //     setEmail(user.email);
  //   }
  // }, [user]);

  return (
    <AppBar
      className={clsx(classes.navbarcolor, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Grid item>
          <Link href="/" style={{ textDecoration: "none" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <img alt="Logo" src={Logo} width="130" />
            </IconButton>
          </Link>
        </Grid>
        <Box flexGrow={1} />

        <Hidden mdDown>
          <Fragment>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="ค้นหาเพลง"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            {CurrentUser ? (
              <Fragment>
                <Link href="#">
                  <Button
                    startIcon={<MusicIcon size={20} />}
                    color="primary"
                    variant="outlined"
                  >
                    อัพโหลดเพลง
                  </Button>
                </Link>
                <Button
                  className={classes.btnupload}
                  onClick={Logout}
                  startIcon={<LogoutIcon size={18} />}
                  color="primary"
                >
                  ออกจากระบบ
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Link
                  href="auth"
                  style={{ textDecoration: "none" }}
                  className={classes.btnupload}
                >
                  <Button startIcon={<LoginIcon size={18} />} color="primary">
                    เข้าสู่ระบบ
                  </Button>
                </Link>

                <Link
                  style={{ textDecoration: "none" }}
                  href="auth/register"
                  className={classes.space}
                >
                  <Button color="primary">ลงทะเบียน</Button>
                </Link>
              </Fragment>
            )}
          </Fragment>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
