import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
    color: "#FFF",
    // color: "#F49F1C", 
    // background:'grey',
    // marginTop:'10px',
    // marginLeft:'-22px',
  },
});

const Logo = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Intelligent Extractor
      </Typography>

    </div>
  );
};

export default Logo;
