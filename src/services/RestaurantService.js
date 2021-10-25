import http from "../utils/http-common";



const getRestaurantList = (uid) => {
  return http.get(`/restaurants/owners/${uid}/restaurants/`);
};

const createRestaurant = (data) => {
  return http.post(`/restaurants/restaurants`, data);
};

const updateRestaurant = (uid, rid, data) => {
  return http.put(`/restaurants/owners/${uid}/restaurants/${rid}`, data);
};

const createMenu = (rid, data) => {
  return http.post(`/menu/restaurants/${rid}/menu-items`, data);
};

const getMenuList = (uid, rid) => {
  return http.get(`/menu/restaurants/${rid}/menu-items`);
};

const getMenuItemById = (mid) => {
  return http.get(`/menu/restaurants/menu-items/${mid}`);
};

const updateMenuItemById = (rid, mid, data) => {
  return http.put(`/menu/restaurants/${rid}/menu-items/${mid}`, data);
};

const getProfile = (uid) => {
  return http.get(`/owners/${uid}`);
};

const updateProfile = (uid, data) => {
  return http.put(`/owners/${uid}`, data);
};

const getOrderList = (rid) => {
  return http.get(`/orders/restaurants/${rid}/orders`);
};

const updatetOrderStatus = (rid, data) => {
  return http.put(`/orders/restaurants/${rid}/orders`, data);
};

const getOrderById = (oid) => {
  return http.get(`/orders/${oid}`);
};

const deactivateRestaurant = (rid) => {
  return http.delete(`/restaurants/${rid}`);
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
  updateProfile,
  getOrderList,
  updatetOrderStatus,
  getOrderById,
  deactivateRestaurant
};