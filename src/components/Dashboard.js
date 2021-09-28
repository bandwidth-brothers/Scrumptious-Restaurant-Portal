import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RestaurantsStateContext } from '../pages/Admin';
import AuthService from '../services/AuthService';
import { RestaurantService } from '../services/RestaurantService';

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

export default function DashBoard() {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useContext(RestaurantsStateContext);
  const history = useHistory();

  useEffect(() => {
    const auth = AuthService.getCurrentUser();

    if (auth && restaurants === null) {
      RestaurantService.getRestaurantList(auth.userId)
        .then(function (response) {
          const re = response.data;
          setRestaurants(re);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }, [restaurants, setRestaurants]);

  const handleEdit = (row)=>{
    console.log(row);
    history.push("/admin/restaurant/update/" + row.restaurantId);
  }

  return (
    <div>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">IsActive</StyledTableCell>
                <StyledTableCell align="right">Price_Category</StyledTableCell>
                <StyledTableCell align="right">Rating</StyledTableCell>
                {/* <StyledTableCell align="right"></StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants && restaurants.map((row) => (
                <StyledTableRow key={row.restaurantId} 
                onClick={()=>handleEdit(row)}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.isActive === true ? "true" : "false"}</StyledTableCell>
                  <StyledTableCell align="right">{row.priceCategory === null ? "N/A" : row.priceCategory}</StyledTableCell>
                  <StyledTableCell align="right">{row.rating === 0 ? "0" : row.rating}</StyledTableCell>
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

