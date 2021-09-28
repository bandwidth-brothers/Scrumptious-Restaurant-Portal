import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import { RestaurantService } from "../services/RestaurantService";
import AuthService from "../services/AuthService";

import { Link } from "react-router-dom";
import { ProfileStateContext } from '../pages/Admin';

const categories = [
  {
    id: 'Restaurant',
    children: [
      { id: 'Restaurant List', icon: <DnsRoundedIcon />, path: '/admin/list' },
      { id: 'Add Restaurant', icon: <PermMediaOutlinedIcon />, path: '/admin/restaurant/add' },
    ],
  },
  {
    id: 'Menu',
    children: [
      { id: 'Menu List', icon: <DnsRoundedIcon />, path: '/admin/restaurant/menu/list' },
      { id: 'Add Menu', icon: <PermMediaOutlinedIcon />, path: '/admin/restaurant/menu/add' },
    ],
  },
  {
    id: 'Profile',
    children: [
      { id: 'Profile', icon: <PeopleIcon />, path: '/admin/profile' },
      // { id: 'Add Menu', icon: <TimerIcon /> },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 18,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;
  const [profile, setProfile] = useContext(ProfileStateContext);
  // const [name, setName] = useState("");

  useEffect(() => {

    const auth = AuthService.getCurrentUser();

    if (auth && !profile) {
      RestaurantService.getProfile(auth.userId)
        .then(function (response) {
          const res = response.data;
          setProfile(res);
          console.log("api called");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [profile]);

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Scrumptious Restaurant
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Hi, {profile? profile.firstName + " " + profile.lastName : ""}
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, path }) => (
              <ListItem
                key={childId}
                button
                component={Link} to={path}
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);