import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { RestaurantService } from '../services/RestaurantService';
import AuthService from '../services/AuthService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHistory, Route } from 'react-router-dom';

const theme = createTheme();

export default function OrderDetail(props) {
    const history = useHistory();
    const [order, setOrder] = useState(null);
    const id = props.match.params.id;
    const rid = props.match.params.rid;

    useEffect(() => {
        const auth = AuthService.getCurrentUser();

        if (auth) {
            RestaurantService.getOrderById(id)
                .then(function (response) {
                    const result = response.data;
                    setOrder(result);
                    console.log(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, []);

    return (
        order ?
            <ThemeProvider

                theme={theme}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
                    <Paper variant="outlined" style={{ marginTop: 0 }} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Order Number - {order.id}
                            </Typography>
                            <List disablePadding>
                                {order.menuitemOrder && order.menuitemOrder.map((product) => (
                                    <ListItem key={product.menuitem.name} sx={{ py: 1, px: 0 }}>
                                        <ListItemText primary={product.menuitem.name} secondary={`$` + product.menuitem.price} />
                                        <Typography variant="body2">{product.quantity}</Typography>
                                    </ListItem>
                                ))}

                                <ListItem sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary="Total Items" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        {order.menuitemOrder.reduce((n, { quantity }) => n + quantity, 0)}
                                    </Typography>
                                </ListItem>
                            </List>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                        Customer
                                    </Typography>
                                    <Typography gutterBottom>{order.customer.firstName + ` ` + order.customer.lastName}</Typography>
                                    <Typography gutterBottom>phone: {order.customer.phone}</Typography>
                                    <Typography gutterBottom>{order.customer.email}</Typography>
                                    {/* <Typography gutterBottom>Houston</Typography>
                                    <Typography gutterBottom>TX, 77494</Typography> */}
                                </Grid>
                                <Grid item container direction="column" xs={12} sm={6}>
                                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                        Order Details
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>Order Time</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>{new Date(order.submittedAt).toLocaleTimeString('en-US')}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>Delivery Time</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>{new Date(order.requestedDeliveryTime).toLocaleTimeString('en-US')}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>Discount</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>{order.orderDiscount ? order.orderDiscount : 0}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>Status</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>{order.status}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                
                                <Button onClick={()=>{
                                    order.status === "COMPLETE" ?
                                    history.push("/admin/restaurant/order/archived/" + rid) : history.push("/admin/restaurant/order/list/" + rid)
                                    }} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                        </Box>
                        </React.Fragment>
                    </Paper>
                </Container>
            </ThemeProvider> : null
    );
}