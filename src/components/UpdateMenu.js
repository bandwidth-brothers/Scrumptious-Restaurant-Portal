import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import ChipInput from 'material-ui-chip-input';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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


function UpdateMenu(props) {

    const classes = useStyles();
    const history = useHistory();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, seterrorAlertContent] = useState('');


    const initialMenuState = {
        name: "",
        price: 0,
        isAvailable: true,
        description: "",
        size: "",
        discount: 0,
        tags: [],
        categories: []
    };


    const id = props.match.params.id;
    const [menu, setMenu] = useState(initialMenuState);
    const [categories, setcategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [data,setData] = useState(null)

    useEffect(() => {
        const auth = AuthService.getCurrentUser();

        if (auth) {
            RestaurantService.getMenuItemById(auth.userId, id)
                .then(function (response) {
                    const res = response.data;
                    setMenu(res);
                    setData(res);

                
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, []);

    useEffect(() => {
        if (data !== null) {
            setcategories(data.categories.map(r => r.type))
        }
    }, [data]);

    useEffect(() => {
        if (data !== null) {
            setTags(data.tags.map(r => r.tagType))
        }
    }, [data]);

    // useEffect(() => {
    //     if (alert === true) {
    //         console.log(alert);
    //         setTimeout(() => setAlert(false), 3000);
    //     }
    // }, [alert]);

    const handleAddChip = (chip, name) => {

        if (name === "categories") {            
            setcategories([...categories, chip]);
        }else{
            setTags([...tags, chip]);
        }

        // console.log(categories);
    };

    const handleDeleteChip = (chip, index, name) => {        
        if (name === "categories") {            
            setcategories(categories.filter((c) => c !== chip));
        }else{
            setTags(tags.filter((c) => c !== chip));
        }
    };


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

        console.log(menu);
        menu.categories = categories;
        menu.tags = tags;
        const auth = AuthService.getCurrentUser();

        if (auth) {
            RestaurantService.updateMenuItemById(auth.userId, id, menu)
                .then(function (response) {
                    // const re = response.data;
                    setAlertContent("Restaurant Update Saved Succeed");
                    setAlert(true);
                    setTimeout(() => {

                        history.push("/admin/restaurant/menu/list");
                    }, 3000);

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
                        Update Menu
                    </Typography>

                    <React.Fragment>
                        {(
                            <form>
                                <React.Fragment>
                                    <Grid container spacing={3}>

                                        <Grid item xs={12}>
                                        <TextField
                                                required
                                                id="name"
                                                name="name"
                                                label="Menu Name"
                                                value={menu.name}
                                                fullWidth
                                                onChange={handleInputChange}
                                                // autoComplete="store-name"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                
                                                id="description"
                                                name="description"
                                                label="Description"
                                                value={menu.description}
                                                fullWidth
                                                onChange={handleInputChange}
                                                // autoComplete="store-name"
                                            />
                                        </Grid>

                                        <Grid item xs={12} >
                                            <ChipInput
                                                label="Categories"
                                                name="categories"
                                                value={categories}
                                                fullWidth
                                                onAdd={(chip) => handleAddChip(chip, "categories")}
                                                onDelete={(chip, index) => handleDeleteChip(chip, index, "categories")}
                                            />
                                        </Grid>

                                        <Grid item xs={12} >
                                            <ChipInput
                                                label="Tags"
                                                nage="tags"
                                                value={tags}
                                                fullWidth
                                                onAdd={(chip) => handleAddChip(chip, "tags")}
                                                onDelete={(chip, index) => handleDeleteChip(chip, index, "tags")}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="price"
                                                name="price"
                                                label="Price"
                                                fullWidth
                                                value={menu.price}
                                                onChange={handleInputChange}
                                            // autoComplete="shipping address-line1"
                                            />

                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="discount"
                                                name="discount"
                                                label="Discount"
                                                fullWidth
                                                value={menu.discount}
                                                onChange={handleInputChange}
                                            // autoComplete="shipping address-line1"
                                            />

                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                
                                                id="size"
                                                name="size"
                                                label="Size"
                                                fullWidth
                                                value={menu.size}
                                                onChange={handleInputChange}
                                            // autoComplete="shipping address-line1"
                                            />

                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="select"
                                                select                                                
                                                name="isAvailable"
                                                label="Avaiable"
                                                fullWidth
                                                value={menu.isAvailable}
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
                                        SAVE
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

export default UpdateMenu;