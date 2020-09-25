import React from 'react';
import  { Outlet }  from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,

    // height: '100%',


  },

}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Nav /> */}
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
