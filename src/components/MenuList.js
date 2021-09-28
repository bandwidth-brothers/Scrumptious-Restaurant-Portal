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
import Select from '@mui/material/Select';
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



function MenuList() {

  const classes = useStyles();
  const [menuList, setMenuList] = useState(null);
  const history = useHistory();
  const [restaurants] = useContext(RestaurantsStateContext);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {

    if (restaurants !== null) {
      setRestaurant(restaurants[0]);
    }else{
      history.push("/admin/list");
    }

  }, [restaurants]);

  useEffect(() => {
    const auth = AuthService.getCurrentUser();
    // console.log(menuList);

    if (auth && restaurant !== null && menuList === null) {
      RestaurantService.getMenuList(auth.userId, restaurant.restaurantId)
        .then(function (response) {
          const re = response.data;
          setMenuList(re);
          // console.log(menuList)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }, [restaurant, menuList]);

  const handleEdit = (row)=>{
    // console.log(row);
    history.push("/admin/restaurant/menu/update/" + row.id);
  }

  return (

    <div>
    <Grid item xs={12}>
      <TableContainer component={Paper}>
         <Grid item xs={12} sm={6} >
         <Select
         style={{ minWidth: '30%', marginBottom: 1 }}       
          id="restaurantId"         
          name="restaurant"
          value={restaurant !== null ? restaurant.name : ''}         
          onChange={(e) => {setRestaurant(restaurants.find(r => r.name === e.target.value )); setMenuList(null)}}          
        >
          {restaurants && restaurants.map((option) => (
            <MenuItem key={option.restaurantId} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
       </Grid>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Available</StyledTableCell>
              {/* <StyledTableCell align="right"></StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {menuList && menuList.map((row) => (
              <StyledTableRow key={row.id} 
              onClick={()=>handleEdit(row)}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.discount}</StyledTableCell>
                <StyledTableCell align="right">{row.isAvailable === true ? "YES" : "No"}</StyledTableCell>
                {/* <StyledTableCell align="right">
                  <Button variant="contained" color="primary" onClick={()=>handleEdit(row)}>EDIT</Button>
                </StyledTableCell>                   */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  </div>
  );
}

export default MenuList;