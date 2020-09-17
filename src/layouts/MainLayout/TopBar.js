import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
// import Logo from "../../../src/components/Logo";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Logo from "../../images/logo.png";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
  navbarcolor: {
    backgroundColor: "#101010",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar
      className={clsx(classes.navbarcolor, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Link to="/">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <img src={Logo} width="130" />
          </IconButton>
        </Link>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <Link to="auth/register">
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <LockOpenIcon color="primary" />
              </Badge>
            </IconButton>
          </Link>
          <Link to="auth">
            <IconButton color="primary">
              <VpnKeyIcon color="primary" />
            </IconButton>
          </Link>
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
