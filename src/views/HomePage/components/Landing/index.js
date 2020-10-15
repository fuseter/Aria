import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import backgroundimage from "../../../../src/images/background.svg";
import { Grid, Button, Typography,Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

// import bglanding from "../../../../src/images/bglanding.svg";
// import Container from "@material-ui/core/Container";
// import warehouse from "../../../../src/images/warehouse.svg";

import bglanding from '../../../../../src/images/Artboard.png'



const useStyles = makeStyles(theme => ({
    root: {},
    cardWrapper: {
        zIndex: 1,
        marginTop: theme.spacing(20)
    },
    ImgWrapper: {
        zIndex: 1,
        marginTop: theme.spacing(15)
    },
    card: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(8, 3)
    },
    cardContent: {
        // maxWidth: 400
    },
    button: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2)
    },
    grow: {
        flexGrow: 1
    },
    div: {
        style: {
            minHeight: "100vh",
            backgroundSize: "cover"
        }
    },
    font: {
        fontSize: 25,
        fontFamily: "Prompt",
        color: "#000000"
    },
    warehouse: {
        width: "80%",
        [theme.breakpoints.down("md")]: {
            width: "95%",
            marginLeft: 10
        }
    }
}));

export default function LandingLayout() {
    const classes = useStyles();
    const [decoded, setDecoded] = useState("");
    const [n, setN] = useState(0);
    const token = localStorage.usertoken;

        return (
            <div
                className={classes.div}
                style={{
                    background: `url(${bglanding})`,
                    minHeight: "100vh",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                }}
            >
                <Container>
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            md={6}
                            className={classes.cardWrapper}
                        >


    <Typography>scscscsc</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            md={6}
                            className={classes.ImgWrapper}
                        >
                            <div
                                data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom"
                            >
                   
                            </div>
     
                        </Grid>
                      
                    </Grid>
                </Container>
            </div>
        )
}
