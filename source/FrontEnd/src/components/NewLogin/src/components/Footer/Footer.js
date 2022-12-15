/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";


import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
          &copy; {1900 + new Date().getYear()} 
          {" "} Xtractly for better Performance
        </div>
      
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};


/*
<div className={classes.socialLine}>
            <Button
              justIcon
              href="#pablo"
              target="_blank"
              color="transparent"
              onClick={e => e.preventDefault()}
            >
              <i className={"fab fa-twitter"} />
            </Button>
            <Button
              justIcon
              href="#pablo"
              target="_blank"
              color="transparent"
              onClick={e => e.preventDefault()}
            >
              <i className={"fab fa-facebook"} />
            </Button>
            <Button
              justIcon
              href="#pablo"
              target="_blank"
              color="transparent"
              onClick={e => e.preventDefault()}
            >
              <i className={"fab fa-google-plus-g"} />
            </Button>
          </div> 
 */