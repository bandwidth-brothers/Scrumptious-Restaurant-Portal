import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useEffect, useState } from 'react';
import { RestaurantsStateContext } from '../pages/Admin';
import AuthService from '../services/AuthService';
import { RestaurantService } from '../services/RestaurantService';


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


function AddMenu() {

    const classes = useStyles();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, seterrorAlertContent] = useState('');


    const initialMenuState = {
        name: "",
        price: "",
        isAvailable: true
    };

    const [restaurants] = useContext(RestaurantsStateContext);
    const [menu, setMenu] = useState(initialMenuState);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        if (alert === true) {
            console.log(alert);
            setTimeout(() => setAlert(false), 3000);
        }
    }, [alert]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setMenu({ ...menu, [name]: value });
    };

    const isValid = (menu) => {
        if (menu.name === "") {
            seterrorAlertContent("menu name is empty");
            setErrorAlert(true);
            return false;
        }

        if (menu.price === "" || isNaN(menu.price)) {
            seterrorAlertContent("menu price is not valid");
            setErrorAlert(true);
            return false;
        }

        seterrorAlertContent("");
        setErrorAlert(false);
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid(menu)) {
            return;
        }
        const auth = AuthService.getCurrentUser();

        if (auth) {
            RestaurantService.createMenu(restaurant.restaurantId, menu)
                .then(function (response) {
                    const re = response.data;
                    console.log(re);
                    setAlertContent("menu: " + menu.name + " add to " + restaurant.name + " successfully");
                    setAlert(true);
                    // history.push("/admin");
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
                    <Typography component="h1" variant="h4" align="center">
                        Add Menu
                    </Typography>

                    <React.Fragment>
                        {(
                            <form>
                                <React.Fragment>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="restaurantId"
                                                select
                                                name="restaurant"
                                                defaultValue=""
                                                fullWidth
                                                onChange={(e) => setRestaurant(e.target.value)}
                                                label="Please select your restaurant"
                                            >
                                                {restaurants && restaurants.map((option) => (
                                                    <MenuItem key={option.restaurantId} value={option}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="menuName"
                                                name="name"
                                                label="Menu Name"
                                                // value={reatau.name}
                                                fullWidth
                                                onChange={handleInputChange}
                                                autoComplete="store-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="price"
                                                name="price"
                                                label="Price"
                                                fullWidth
                                                // value={reatau.lineOne}
                                                onChange={handleInputChange}
                                            // autoComplete="shipping address-line1"
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="select"
                                                select
                                                defaultValue=""
                                                name="isAvailable"
                                                label="Avaiable"
                                                fullWidth
                                                // value={true}
                                                onChange={handleInputChange}
                                            // autoComplete="shipping address-line2"
                                            >
                                                <MenuItem value={true} >YES</MenuItem>
                                                <MenuItem value={false}>NO</MenuItem>
                                            </TextField>
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

export default AddMenu;