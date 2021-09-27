import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Grid from '@material-ui/core/Grid';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
      Scrumptious
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      // setRememberMe(true);
      setUsername(localStorage.getItem("username"));
    }

    if (localStorage.getItem("password")) {
      setPassword(localStorage.getItem("password"));
    }
  }, []);

  const validateForm = (username, password)=> {
    if(username==="" || password===""){
      setError("Email or Password is Empty");
      return false;
    }else {
      return true;
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if(validateForm(username, password)){
      AuthService.login(username, password).then(
        () => {
          history.push("/admin/list");
          window.location.reload();
        },
        err => {          
          // if (err.response.status === 401) setError(err.response.data.message);          
          setError("Invalid user. Please try again.");
        }
      );
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="username"
            value={username}
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" name="rememberMe" checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)} />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleLogin(e)}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}