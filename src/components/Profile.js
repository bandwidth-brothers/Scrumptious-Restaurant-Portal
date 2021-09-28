import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileStateContext } from '../pages/Admin';
import AuthService from "../services/AuthService";
import { RestaurantService } from "../services/RestaurantService";


const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function Profile() {
  const classes = useStyles();

  const initialProfileState = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  };

  const [profile, setProfile] = useContext(ProfileStateContext);
  const [formData, setFormData] = useState(initialProfileState);
  const [alertContent, setAlertContent] = useState('');
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertContent, seterrorAlertContent] = useState('');


  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...profile, [name]: value });
  };

  const isValid = (formData) => {

    if (formData.firstName === "") {
      seterrorAlertContent("first name is empty");
      setErrorAlert(true);
      return false;
    }

    if (formData.lastName === "") {
      seterrorAlertContent("last name is empty");
      setErrorAlert(true);
      return false;
    }

    if (formData.email === "") {
      seterrorAlertContent("email is empty");
      setErrorAlert(true);
      return false;
    }



    if (formData.phone === "") {
      seterrorAlertContent("phone is empty");
      setErrorAlert(true);
      return false;
    }

    seterrorAlertContent("");
    setErrorAlert(false);
    return true;

  }


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(profile);
    if (!isValid(formData)) {
      return;
    }
    const auth = AuthService.getCurrentUser();

    if (auth) {
      RestaurantService.updateProfile(auth.userId, formData)
        .then(function (response) {
          const res = response.data;
          console.log(res);
          setProfile(res);
          setAlertContent("Update profile Succeed");
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h6" align="center">
            Profile
          </Typography>

          <React.Fragment>
            {(
              <form>
                <React.Fragment>
                  <Grid container spacing={3}>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="firtName"
                        name="firstName"
                        label="First Name"
                        value={formData.firstName}
                        fullWidth
                        onChange={handleInputChange}
                        autoComplete="store-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        value={formData.lastName}
                        onChange={handleInputChange}
                      // autoComplete="shipping address-line1"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        fullWidth
                        onChange={handleInputChange}
                        autoComplete="store-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone"
                        fullWidth
                        value={formData.phone}
                        onChange={handleInputChange}
                      // autoComplete="shipping address-line1"
                      />
                    </Grid>


                    <Grid item xs={12}>
                      {errorAlert ? <Alert severity='error'>{errorAlertContent}</Alert> : <></>}
                    </Grid>
                  </Grid>
                </React.Fragment>
                {alert ? <Alert severity='success'>{alertContent}</Alert> : <></>}
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    Save
                  </Button>
                </div>
              </form>
            )}

          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Profile;