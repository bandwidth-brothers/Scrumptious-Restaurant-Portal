import http from "../utils/http-common";



const getRestaurantsList = (uid) => {
  return http.get(`restaurants/owners/${uid}/restaurants`);
};

const createRestaurant = (uid, data) => {
  data = { ...data, "restaurantOwnerId": uid }
  return http.post(`restaurants/restaurants`, data);
};

const updateRestaurant = (uid, mid, data) => {
  return http.put(`/owners/${uid}/restaurants/${mid}`, data);
};

const createMenu = (uid, rid, data) => {
  return http.post(`/owners/${uid}/restaurants/${rid}/menu-items`, data);
};

const getMenuList = (uid, rid) => {
  return http.get(`/owners/${uid}/restaurants/${rid}/menu-items`);
};

const getMenuItemById = (uid, mid) => {
  return http.get(`/owners/${uid}/restaurants/menu-items/${mid}`);
};

const updateMenuItemById = (uid, mid, data) => {
  return http.put(`/owners/${uid}/restaurants/menu-items/${mid}`, data);
};

const getProfile = (uid) => {
  return http.get(`/owners/${uid}`);
};

const updateProfile = (uid, data) => {
  return http.put(`/owners/${uid}`, data);
};


export const RestaurantService = {
  getRestaurantsList,
  createRestaurant,
  updateRestaurant,
  createMenu,
  getMenuList,
  getMenuItemById,
  updateMenuItemById,
  getProfile,
  updateProfile
};