import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}Scrumptious
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Register() {

    const history = useHistory();
    const [alertContent, setAlertContent] = useState('');
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, seterrorAlertContent] = useState('');

    const isValid = (registerData) => {

        if (registerData.firstName === "") {
            seterrorAlertContent("first name is empty");
            setErrorAlert(true);
            return false;
        }

        if (registerData.lastName === "") {
            seterrorAlertContent("last name is empty");
            setErrorAlert(true);
            return false;
        }

        if (registerData.email === "") {
            seterrorAlertContent("email is empty");
            setErrorAlert(true);
            return false;
        }

        if (registerData.phone === "") {
            seterrorAlertContent("phone is empty");
            setErrorAlert(true);
            return false;
        }

        if (registerData.password.length < 3) {
            seterrorAlertContent("password lenght less than 3 chars ");
            setErrorAlert(true);
            return false;
        }

        seterrorAlertContent("");
        setErrorAlert(false);
        return true;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console

        const registerData = {
            email: data.get('email'),
            password: data.get('password'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            phone: data.get('phone')
        };

        if (!isValid(registerData)) {
            return;
        }

        console.log(registerData);


        AuthService.register(registerData).then(
            () => {
                setAlertContent("Register Succeed, Will Redirect to Login Page in 5 Seconds");
                setAlert(true);
                setTimeout(() => {
                    history.push("/login");
                }, 5000);
            },
            err => {
                // if (err.response.status === 401) setError(err.response.data.message);          
                //   setError("Invalid user. Please try again.");
                console.log(err.response);
            }
        );

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="phone"
                                    id="phone"
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {errorAlert ? <Alert severity='error'>{errorAlertContent}</Alert> : <></>}
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {alert ? <Alert severity='success'>{alertContent}</Alert> : <></>}
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}