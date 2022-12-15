import React,{useState,useEffect} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Snackbar,
  IconButton,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Page from 'src/components/Page';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorUnique,setErrorUnique] = useState('');
  const handleError=async (x)=>{
    await setErrorUnique(x)
    console.log(errorUnique)
  }
  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <ol id="demo">
        </ol>

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: '',
              fname: '',
              lname: '',
              email: '',
              // dateofbirth: null
            }}
            validationSchema={
              Yup.object().shape({
                username: Yup.string().max(255).required('Username is required'),
                password: Yup.string().max(255).required('password is required'),
                fname: Yup.string().max(255).required('First name is required'),
                lname: Yup.string().max(255).required('Last Nname is required'),
                email: Yup.string().max(255).required('Email is required')
                // dateofbirth: Yup.date().required('Date of birth is required')
              })
            }
            onSubmit={async (values) => {
              const userdetails={
                username:values.username,
                password:values.password,
                email:values.email,
                firstname:values.fname,
                lastname:values.lname
                // dateofbirth:values.dateofbirth
              }
              await axios.post(process.env.REACT_APP_BASE_URL+'user',userdetails)
              .then((res)=>{
                console.log(res)
                if (res.data != 'success'){
                  console.log(res.data)
                  handleError(res.data)
                }else{
                navigate('/login', { replace: true });
                }
              })
              .catch(err=>{
                console.log('Error')
                navigate('/register', { replace: true });
              })
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.fname && errors.fname)}
                  fullWidth
                  helperText={touched.fname && errors.fname}
                  label="First Name"
                  margin="normal"
                  name="fname"
                  onChange={handleChange}
                  type="fname"
                  value={values.fname}
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(touched.lname && errors.lname)}
                  fullWidth
                  helperText={touched.lname && errors.lname}
                  label="Last name"
                  margin="normal"
                  name="lname"
                  onChange={handleChange}
                  type="lname"
                  value={values.lname}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  autoComplete="off"
                />
                
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                  {errorUnique!==''?
                    <Alert severity="error">{errorUnique}</Alert>:<div></div>}
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
