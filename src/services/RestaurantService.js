import http from "../utils/http-common";



const getRestaurantList = (uid) => {
  return http.get(`/owner/${uid}/restaurant/`);
};

const createRestaurant = (uid, data) => {
  return http.post(`/owner/${uid}/restaurant`, data);
};

const updateRestaurant = (uid, mid, data) => {
  return http.put(`/owner/${uid}/restaurant/${mid}`, data);
};

const createMenu = (uid, rid, data) => {
  return http.post(`/owner/${uid}/restaurant/${rid}/menu-items`, data);
};

const getMenuList = (uid, rid) => {
  return http.get(`/owner/${uid}/restaurant/${rid}/menu-items`);
};

const getMenuItemById = (uid, mid) => {
  return http.get(`/owner/${uid}/restaurant/menu-items/${mid}`);
};

const updateMenuItemById = (uid, mid, data) => {
  return http.put(`/owner/${uid}/restaurant/menu-items/${mid}`, data);
};

const getProfile = (uid) => {
  return http.get(`/owner/${uid}`);
};

const updateProfile = (uid, data) => {
  return http.put(`/owner/${uid}`, data);
};


export const RestaurantService = {
  getRestaurantList,
  createRestaurant,
  updateRestaurant,
  createMenu,
  getMenuList,
  getMenuItemById,
  updateMenuItemById,
  getProfile,
  updateProfile
};