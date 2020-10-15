import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import img1 from "../../../../images/1.png";
import { Columns } from "react-feather";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  sectionTitle: {
    textTransform: "uppercase",
    color: "grey",
    letterSpacing: "1.25px",
    fontSize: "13.75px",
    marginBottom: "10px",
  },
  tracks: {
    display: "flex",
    flex: "column",
    flexWrap: "wrap",
    marginBottom: "15px",
  },
  track: {
    // border-top: 1px solid $light-black;
    height: "42px",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
  },
  img: {
    width: "42px",
    height: "42px",
  },
  number: {
    marginLeft: "10px",
    color: "grey",
    width: "12px",
  },
  added: {
    marginLeft: "30px",
    color: "sand",
  },
  title: {
    width: "45%",
    marginLeft: "30px",
    color: "white",
  },
  explicit: {},
  label: {
    border: "1px",
    borderStyle: "solid",
    borderColor: "white",
    color: "white",
    textTransform: "uppercase",
  },
  plays: {
    color: "grey",
    marginLeft: "auto",
    paddingRight: "10px",
  },
  buttonlight: {
    background: "none",
    color: "sand",
    border: "1px",
    borderColor: "sand",
  },
}));

export default function Category() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h3
        className={classes.sectionTitle}
        style={{
          padding: 20,
          paddingLeft: 50,
        }}
      >
        CATAGORY
      </h3>
      <hr
        style={{
          align: "center",
          marginLeft: "auto",
          marginRight: "auto",
          width: "95%",
          color: "gray",
        }}
      />
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia className={classes.media} image={img1} title="Paella dish" />
        {/* listcatagory */}
        <CardContent>
          {/* <Columns> */}
          <div className={classes.tracks}>
            <div className={classes.track}>
              <div className={classes.img}>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg"
                  alt="When It's Dark Out"
                />
              </div>

              <div className={classes.number}>1</div>

              <div className={classes.title}>Me, Myself & I</div>

              <div className={classes.explicit}>
                <span className={classes.label}>Explicit</span>
              </div>

              <div className={classes.plays}>147,544,165</div>
            </div>

            <div className={classes.track}>
              <div className={classes.img}>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/tth.jpg"
                  alt="These Things Happen"
                />
              </div>

              <div className={classes.number}>2</div>

              <div className={classes.title}>I Mean It</div>

              <div className={classes.explicit}>
                <span className={classes.label}>Explicit</span>
              </div>

              <div className={classes.plays}>74,568,782</div>
            </div>

            <div className={classes.track}>
              <div className={classes.img}>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg"
                  alt="When It's Dark Out"
                />
              </div>

              <div className={classes.number}>3</div>

              <div className={classes.title}>Calm Down</div>

              <div className={classes.explicit}>
                <span className={classes.label}>Explicit</span>
              </div>

              <div className={classes.plays}>13,737,506</div>
            </div>

            <div className={classes.track}>
              <div className={classes.img}>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg"
                  alt="When It's Dark Out"
                />
              </div>

              <div className={classes.number}>4</div>

              <div className={classes.title}>Some Kind Of Drug</div>

              <div className={classes.explicit}>
                <span className={classes.label}>Explicit</span>
              </div>

              <div className={classes.plays}>12,234,881</div>
            </div>

            <div className={classes.track}>
              <div className={classes.img}>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/tth.jpg"
                  alt="These Things Happen"
                />
              </div>

              <div className={classes.number}>5</div>

              <div className={classes.title}>Let's Get Lost</div>

              <div className={classes.explicit}>
                <span className={classes.label}>Explicit</span>
              </div>

              <div className={classes.plays}>40,882,954</div>
            </div>
          </div>
         {/* </Columns> */}

          <button className={classes.buttonlight}>Show 5 More</button>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            12345678
          </CardContent>
        </Collapse>
      </Card>
    </div>
    
  );
}
