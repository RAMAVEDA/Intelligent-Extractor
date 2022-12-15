import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName1: '',
    lastName1: '',
    password1: '',
    confirmpassword1: ''
  });

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL+'user')
        .then((res)=>{
          res.data.map(x=>{
            if (x['username']==sessionStorage.getItem('Username')){
              setValues({
                firstName1:x['firstname'],
                lastName1:x['lastname']
              })
            }
          })
        })
        .catch(err=>{
          console.log('Error')
        })
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    console.log('submit')
    var data = {}
    data['username'] = sessionStorage.getItem('Username')
    data['lastname'] = values.lastName1
    data['firstname'] = values.firstName1
    data['password'] = values.password1
    return await axios.post(process.env.REACT_APP_BASE_URL+'user',data)
      .then((res)=>{
        console.log('saved');
      })
      .catch(err=>{
        console.log('Error');
      })
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName1"
                onChange={handleChange}
                required
                value={values.firstName1}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName1"
                onChange={handleChange}
                required
                value={values.lastName1}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Password"
                name="password1"
                type="password"
                onChange={handleChange}
                required
                value={values.password1}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirm_password1"
                type="confirm_password"
                onChange={handleChange}
                value={values.confirm_password1}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onclick={handleSubmit}
            disabled="true"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
