import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { RestaurantService } from '../services/RestaurantService';
import { RestaurantsStateContext } from '../pages/Admin';

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
            width: 450,
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

function AddRestaurant() {
    const classes = useStyles();
    const history = useHistory();
    const auth = AuthService.getCurrentUser();

    const initialRestauState = {
        name: "",
        lineOne: "",
        lineTwo: "",
        city: "",
        state: "",
        zip: "",
        restaurantOwnerId: ""
    };

    const [restau, setRestau] = useState(initialRestauState);
    const [alertContent, setAlertContent] = useState('');
    const [alert, setAlert] = useState(false);
    const [restaurants, setRestaurants] = useContext(RestaurantsStateContext);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setRestau({ ...restau, [name]: value });
    };

    const isValid = (restau) => {
        if (restau.name === "") {
            setAlertContent("restaurant name is empty");
            setAlert(true);
            return false;
        }

        if (restau.lineOne === "") {
            setAlertContent("address line one is empty");
            setAlert(true);
            return false;
        }

        if (restau.city === "") {
            setAlertContent("address city is empty");
            setAlert(true);
            return false;
        }

        if (restau.state === "") {
            setAlertContent("address state is empty");
            setAlert(true);
            return false;
        }

        if (restau.zip === "" || isNaN(restau.zip)) {
            setAlertContent("address zip is not valid");
            setAlert(true);
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid(restau)) {
            return;
        }

        


        if (auth) {
            setRestau({ ...restau, "restaurantOwnerId": auth.userId });
            RestaurantService.createRestaurant(restau)
                .then(function (response) {

                    RestaurantService.getRestaurantList(auth.userId)
                    .then(function (r) {
                        const data = r.data;
                        setRestaurants(data);
                        history.push("/admin/list");
                    })                      

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
                    <Typography component="h1" variant="h5" align="center">
                        Add Restaurant
                    </Typography>

                    <React.Fragment>
                        {(
                            <form >
                                <React.Fragment>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="storeName"
                                                name="name"
                                                label="Restaurant Name"
                                                fullWidth
                                                onChange={handleInputChange}
                                                autoComplete="store-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="address1"
                                                name="lineOne"
                                                label="Address line 1"
                                                fullWidth
                                                value={restau.lineOne}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="address2"
                                                name="lineTwo"
                                                label="Address line 2"
                                                fullWidth
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="city"
                                                name="city"
                                                label="City"
                                                fullWidth
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="state"
                                                name="state"
                                                label="State"
                                                fullWidth
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="zip"
                                                name="zip"
                                                label="Zip code"
                                                fullWidth
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="country"
                                                name="country"
                                                label="US"
                                                // defaultValue="US"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            {alert ? <Alert severity='error'>{alertContent}</Alert> : <></>}
                                        </Grid>
                                    </Grid>
                                </React.Fragment>

                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                        className={classes.button}
                                    >
                                        ADD
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
export default AddRestaurant;