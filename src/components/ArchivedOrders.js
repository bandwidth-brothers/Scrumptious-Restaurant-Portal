import { MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { RestaurantsStateContext } from "../pages/Admin";
import AuthService from "../services/AuthService";
import { OrderService } from "../services/OrderService";

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#232f3e',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



function ArchivedOrders(props) {

  const classes = useStyles();
  const [orderList, setOrderList] = useState(null);
  const history = useHistory();
  const [restaurants] = useContext(RestaurantsStateContext);
  const [restaurant, setRestaurant] = useState(null);
  const rid = props.match.params.rid;

  useEffect(() => {

    if (restaurants !== null) {
      setRestaurant(rid !== '0' ? restaurants.find(r => r.id === parseInt(rid)) : restaurants[0]);
    } else {
      history.push("/admin/list");
    }

  }, [restaurants]);

  useEffect(() => {
    const auth = AuthService.getCurrentUser();
    // console.log(menuList);

    if (auth && restaurant !== null && orderList === null) {
      OrderService.getAllOrdersByRestaurant(restaurant.id, auth.userId)
        .then(function (response) {
          const re = response.data;
          setOrderList(re.filter(o => o.preparationStatus === "Completed"));
          console.log(re)
        })
        .catch(function (error) {
          console.log(error);
        });
      // RestaurantService.getOrderList(restaurant.id)
      //   .then(function (response) {
      //     const re = response.data;
      //     re.sort((a,b) => a.preparationStatus.localeCompare(b.preparationStatus)  );
      //     setOrderList(re.filter(o => o.preparationStatus === "COMPLETE"));         

      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    }

  }, [restaurant, orderList]);



  const handleRowClick = (event, id) => {
    console.log("row link: " + id);
    history.push("/admin/restaurant/" + restaurant.id + "/order/" + id);
  };


  return (

    <div>

      <Grid container spacing={1} >
        <Grid item >
          <TextField
            select
            id="restaurantId"
            name="restaurant"
            label="Restaurant"
            value={restaurant !== null ? restaurant.name : ''}
            onChange={(e) => { setRestaurant(restaurants.find(r => r.name === e.target.value)); setOrderList(null) }}
          >
            {restaurants && restaurants.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid item xs={12}>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>

                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell align="center">ConfirmationCode</StyledTableCell>
                <StyledTableCell align="center">Order Time</StyledTableCell>
                <StyledTableCell align="center">Request Delivery Time</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList && orderList.map((row) => (
                <StyledTableRow key={row.id}
                  // onClick={() => handleEdit(row)}
                  onClick={event => handleRowClick(event, row.id)}
                >

                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>

                  <StyledTableCell align="center">{row.confirmationCode}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(row.submittedAt).toLocaleTimeString('en-US')}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(row.requestedDeliveryTime).toLocaleTimeString('en-US')}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={row.preparationStatus === "Order Placed" ? { color: "#ffd300" } :
                      row.preparationStatus === "Cancelled" ? { color: "red" } : { color: "GREEN" }}
                  >{row.preparationStatus}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default ArchivedOrders;