import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@mui/material/Checkbox';
// import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { RestaurantsStateContext } from "../pages/Admin";
import AuthService from "../services/AuthService";
import { RestaurantService } from "../services/RestaurantService";

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



function OrderList(props) {

  const classes = useStyles();
  const [orderList, setOrderList] = useState(null);
  const history = useHistory();
  const [restaurants] = useContext(RestaurantsStateContext);
  const [restaurant, setRestaurant] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [checked, setChecked] = useState([]);
  // const rid = props.match.params.rid;
  const [rid, setRid] = useState(props.match.params.rid);


  useEffect(() => {

    if (restaurants !== null) {
      setRestaurant(rid !== '0' ? restaurants.find(r => r.id === parseInt(rid) ) : restaurants[0] );
    } else {
      history.push("/admin/list");
    }

  }, [restaurants]);

  useEffect(() => {
    const auth = AuthService.getCurrentUser();
    // console.log(menuList);

    if (auth && restaurant && orderList === null) {
      RestaurantService.getOrderList(restaurant.id)
        .then(function (response) {
          const re = response.data;
          re.sort((a,b) => a.status.localeCompare(b.status)  );
          setOrderList(re.filter(o => o.status !== "COMPLETE"));
          
          console.log(re.filter(o => o.status === "PENDING"))
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }, [restaurant, orderList]);

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };


  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();

    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleRowClick = (event, id) => {
    console.log("row link: " + id);
    setRid(restaurant.id);
    history.push("/admin/restaurant/" + restaurant.id + "/order/" + id);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(checked);
    // if (!isValid(formData)) {
    //   return;
    // }
    const formData = {
      ids: checked,
      status: status
    }
    const auth = AuthService.getCurrentUser();

    if (auth) {
      RestaurantService.updatetOrderStatus(restaurant.id, formData)
        .then(function (response) {
          const res = response;
          console.log(res);
          if (res.status === 204) {
            console.log("204 get");
            setOrderList(orderList.map(o => checked.includes(o.id) ? { ...o, status: status } : o));
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };



  return (

    <div>

      <Grid alignItems="stretch" container spacing={1} >
        <Grid item >
          <TextField
            style={{ width: 150, marginBottom: 1 }}
            select
            id="restaurantId"
            name="restaurant"
            label="Restaurant"                      
            value={restaurant ? restaurant.name : ''}
            onChange={(e) => { setRestaurant(restaurants.find(r => r.name === e.target.value)); setOrderList(null) }}
          >
            {restaurants && restaurants.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item >

          <TextField
            id="updateStatus"
            select
            name="updateStatus"
            label="Update Status"
            fullWidth
            value={status}
            onChange={handleStatusChange}
          // autoComplete="shipping address-line2"
          >
            <MenuItem value="PENDING" >PENDING</MenuItem>
            <MenuItem value="READY" >READY</MenuItem>
            <MenuItem value="COMPLETE" >COMPLETE</MenuItem>
          </TextField>
        </Grid>
        <Grid item  style={{ display: "flex" }}>
          <Button color="primary"
            onClick={handleSubmit}
            variant="contained">
            Update Status
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
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

                  <StyledTableCell align="left">
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(row.id) !== -1}
                      onClick={event =>
                        handleCheckboxClick(event, row.id)
                      }
                      tabIndex={-1}
                      disableRipple
                    // inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>

                  <StyledTableCell align="center">{row.confirmationCode}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(row.submittedAt).toLocaleTimeString('en-US')}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(row.requestedDeliveryTime).toLocaleTimeString('en-US')}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={row.status==="PENDING" ? { color: "red" } : { color: "GREEN" } }
                  >{row.status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default OrderList;