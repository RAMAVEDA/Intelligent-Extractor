import React,{useState} from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  // const param = new URLSearchParams()
  const classes = useStyles();
  const navigate = useNavigate();
  const [error_text, setChanged] = useState('');
  const errorVisibleFun=(x)=>{
    setChanged(x);
    console.log(x)
  }
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: 'sha',
              password: 'test1'
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().min(3).max(255).required('Username is required'),
              password: Yup.string().min(3).max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
              const uri = process.env.REACT_APP_BASE_URL+'user'
              const user = {
                username:values.username,
                password:values.password
              }
              let s = ''
              let s1 = ''
              await axios.get(uri+'/'+user.username+'/'+user.password)
      
              .then(res=>{
                console.log(uri+'/'+user.username+'/'+user.password)
                console.log(res.data)
                s = res.data['username']
                s1 = res.data['firstname']
                    
                if (s.length>0){
                  sessionStorage.setItem('Username',s)
                  sessionStorage.setItem('FirstName',s1)
                  console.log(sessionStorage.getItem('Username'))
                  errorVisibleFun(null)
                  navigate('/app/dashboard', { replace: true });
                }
                console.log('Invalid cred')
                errorVisibleFun('Invalid credentials') 
              })
                .catch(e=>{
                  console.log('Invalid cred')
                  errorVisibleFun('Invalid credentials')
                })
              
            
          }}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              handleBlur,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && (errors.username || error_text))}
                  fullWidth
                  helperText={touched.username && (error_text || errors.username)}
                  label="Username"
                  required
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && (errors.password || error_text))}
                  fullWidth
                  helperText={touched.password && (errors.password || error_text)}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  required
                />

                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
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

export default LoginView;
