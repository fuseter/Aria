import React, { Fragment, useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Logo from "../../../src/images/logo.png";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Link } from "react-router-dom";
import {
  LogIn as LoginIcon,
  Music as MusicIcon,
  User as Iconuser,
  LogOut as IconLogout,
  ChevronDown as Cd,
} from "react-feather";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: 35,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appbarcolor: {
    backgroundColor: "#111111",
  },
  logo: {
    width: 100,
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [CurUser, setCurUser] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [CurTime, setCurTime] = useState("");
  const [CurUsername, setCurUsername] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let today = new Date();
  let curHr = today.getHours();

  useEffect(() => {
    if (curHr < 12) {
      setCurTime("สวัสดีตอนเช้า, ");
    } else if (curHr < 18) {
      setCurTime("สวัสดีตอนบ่าย, ");
    } else {
      setCurTime("สวัสดีตอนเย็น, ");
    }
  }, [curHr]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
      } else setCurUser(null);
    });
  }, []);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setCurUser(null);
        navigate("/");
      });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <ElevationScroll {...props}>
          <AppBar className={classes.appbarcolor}>
            <Toolbar>
              <Link to="/">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <img alt="Logo" src={Logo} className={classes.logo} />
                </IconButton>
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="ค้นหาเพลง..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />

              <div className={classes.sectionDesktop}>
                <Grid container spacing={3}>
                  {CurUser ? (
                    <Fragment>
                      <Grid item style={{ marginRight: 20 }}>
                        <Link to="/upload" style={{ color: "#000000" }}>
                          <Button
                            variant="contained"
                            startIcon={<MusicIcon size={20} />}
                            color="primary"
                          >
                            <Typography variant="h5">อัพโหลดเพลง</Typography>
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item>
                        <div>
                          {CurTime}
                          <Button
                            ref={anchorRef}
                            aria-controls={open ? "menu-list-grow" : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            endIcon={<Cd size="20" />}
                          >
                            {CurUsername}
                          </Button>
                          <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                          >
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{
                                  transformOrigin:
                                    placement === "bottom"
                                      ? "center top"
                                      : "center bottom",
                                }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                      autoFocusItem={open}
                                      id="menu-list-grow"
                                      onKeyDown={handleListKeyDown}
                                    >
                                      <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                          <Iconuser size="18" color="#ffffff" />
                                        </ListItemIcon>
                                        โปรไฟล์
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                          <MusicIcon
                                            size="18"
                                            color="#ffffff"
                                          />
                                        </ListItemIcon>
                                        เพลงของฉัน
                                      </MenuItem>
                                      <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                          <IconLogout
                                            size="18"
                                            color="#ffffff"
                                          />
                                        </ListItemIcon>
                                        ออกจากระบบ
                                      </MenuItem>
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                        </div>
                      </Grid>
                      {/* <Grid item>
                        <Button color="primary" onClick={logout}>
                          <Typography variant="h5">ออกจากระบบ</Typography>
                        </Button>
                      </Grid> */}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {/* <Grid item>
                        <Link to="/upload" style={{ color: "#000000" }}>
                          <Button
                            variant="contained"
                            startIcon={<MusicIcon size={20} />}
                            color="primary"
                          >
                            <Typography variant="h5">อัพโหลดเพลง</Typography>
                          </Button>
                        </Link>
                      </Grid> */}
                      <Grid item>
                        <Link to="/auth" style={{ color: "#000000" }}>
                          <Button
                            startIcon={<LoginIcon size={20} />}
                            color="primary"
                          >
                            <Typography variant="h5">เข้าสู่ระบบ</Typography>
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link to="/auth/register" style={{ color: "#000000" }}>
                          <Button color="primary">
                            <Typography variant="h5">ลงทะเบียน</Typography>
                          </Button>
                        </Link>
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
