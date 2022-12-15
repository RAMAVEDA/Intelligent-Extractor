/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <div>
        <Link to={"/"} className={classes.link}>
          <Button color="white" size="lg" simple>
            About us
          </Button>
        </Link>
        <Link to={"/"} className={classes.link}>
          <Button color="white" size="lg" simple>
            Contact us
          </Button>
        </Link>
        <Link to={"/login-page"} className={classes.link}>
          <Button color="white" size="lg" simple>
            Login
          </Button>
        </Link>
    </div>
  );
}
