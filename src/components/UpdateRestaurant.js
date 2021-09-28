import { RestaurantsStateContext } from '../pages/Admin';
import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import { Router, useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { RestaurantService } from '../services/RestaurantService';
import ChipInput from 'material-ui-chip-input';
import { MenuItem } from '@material-ui/core';
import Rating from '@mui/material/Rating';



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
            width: 600,
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
    chipInputRoot: {
        border: '1px solid red',
        borderRadius: 2
    },
    chip: {
        background: 'linear-gradient(#dd00f3)',
        backgroundSize: '50% 50%',
        // animation: 'rainbow 18s ease infinite'
    },
}));

function UpdateRestaurant(props) {
    const classes = useStyles();
    const history = useHistory();

    const [restaurants, setRestaurants] = useContext(RestaurantsStateContext);
    const [res, setRes] = useState(null);



    const id = props.match.params.id;
    // const res = restaurants.find(s => s.restaurantId === parseInt(id))
    const initialFormDataState = {
        name: '',
        categories: [],
        phone: '',
        priceCategory: '',
        lineOne: '',
        lineTwo: '',
        city: '',
        state: '',
        zip: ''

    };
    const [formData, setFormData] = useState(initialFormDataState);
    const [cate, setCate] = useState([]);

    const [alertContent, setAlertContent] = useState('');
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, seterrorAlertContent] = useState('');

    const isValid = (formData) => {

        if (formData.name === "") {
            seterrorAlertContent("restaurant name is empty");
            setErrorAlert(true);
            return false;
        }

        if (formData.lineOne === "") {
            seterrorAlertContent("address line one is empty");
            setErrorAlert(true);
            return false;
        }

        if (formData.city === "") {
            seterrorAlertContent("address city is empty");
            setErrorAlert(true);
            return false;
        }

        if (formData.state === "") {
            seterrorAlertContent("address state is empty");
            setErrorAlert(true);
            return false;
        }

        if (formData.zip === "" || isNaN(formData.zip)) {
            seterrorAlertContent("address zip is not valid");
            setErrorAlert(true);
            return false;
        }

        seterrorAlertContent("");
        setErrorAlert(false);
        return true;

    }


    useEffect(() => {

        if (restaurants !== null) {

            setRes(restaurants.find(s => s.restaurantId === parseInt(id)));
        } else {
            history.push("/admin/list");
        }

    }, []);

    useEffect(() => {

        if (res !== null) {
            setFormData({
                name: res.name,
                categories: [],
                phone: res.phone,
                priceCategory: res.priceCategory,
                lineOne: res.address.lineOne,
                lineTwo: res.address.lineTwo,
                city: res.address.city,
                state: res.address.state,
                zip: res.address.zip,
            });
        }

    }, [res]);

    useEffect(() => {
        if (res !== null) {
            setCate(res.restaurantCategories.map(r => r.type))
        }
    }, [res]);


    const handleAddChip = chip => {

        setCate([...cate, chip]);
        console.log(cate);
    };

    const handleDeleteChip = (chip, index) => {
        setCate(cate.filter((c) => c !== chip));
    };


    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.categories = cate;
        if (!isValid(formData)) {
            return;
        }

        const auth = AuthService.getCurrentUser();
        // const result = '';

        if (auth) {
            RestaurantService.updateRestaurant(auth.userId, res.restaurantId, formData)
                .then(function (response) {

                    RestaurantService.getRestaurantList(auth.userId)
                        .then(function (r) {
                            const data = r.data;
                            setRestaurants(data);                            

                            setAlertContent("Restaurant Update Saved Succeed");
                            setAlert(true);
                            setTimeout(() => {
                                history.push("/admin/list");
                            }, 3000);

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
                    <Typography component="h1" variant="h6" align="center">
                        Update Restaurant
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
                                                value={formData.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Rating name="half-rating" value={res ? res.rating : 0} precision={0.5} readOnly />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <ChipInput
                                                label="Restaurant Categories"
                                                value={cate === null ? '' : cate}
                                                fullWidth
                                                onAdd={(chip) => handleAddChip(chip)}
                                                onDelete={(chip, index) => handleDeleteChip(chip, index)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="phone"
                                                name="phone"
                                                label="Phone Number"
                                                fullWidth
                                                onChange={handleInputChange}
                                                value={formData.phone}
                                            />
                                        </Grid>



                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="priceCategory"
                                                name="priceCategory"
                                                label="priceCategory($, $$, $$$)"
                                                fullWidth
                                                onChange={handleInputChange}
                                                inputProps={{ maxLength: 3 }}
                                                value={formData.priceCategory == null ? '$' : formData.priceCategory}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="address1"
                                                name="lineOne"
                                                label="Address line 1"
                                                fullWidth
                                                onChange={handleInputChange}
                                                value={formData.lineOne}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="address2"
                                                name="lineTwo"
                                                label="Address line 2"
                                                fullWidth
                                                onChange={handleInputChange}
                                                value={formData.lineTwo}
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
                                                value={formData.city}
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
                                                value={formData.state}
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
                                                value={formData.zip}
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
                                            {errorAlert ? <Alert severity='error'>{errorAlertContent}</Alert> : <></>}
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
                                        SAVE
                                    </Button>
                                </div>
                                <Grid item xs={12}>
                                    {alert ? <Alert severity='success'>{alertContent}</Alert> : <></>}
                                </Grid>
                            </form>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
export default UpdateRestaurant;