import { HttpAxios } from "../utils/http-common";



const getRestaurantsList = (uid) => {
  return HttpAxios.restaurantInstance.get(`/restaurants/owners/${uid}/restaurants/`);
};

const createRestaurant = (data) => {
  return HttpAxios.restaurantInstance.post(`/restaurants/restaurants`, data);
};

const updateRestaurant = (uid, rid, data) => {
  return HttpAxios.restaurantInstance.put(`/restaurants/owners/${uid}/restaurants/${rid}`, data);
};

const createMenu = (rid, data) => {
  return HttpAxios.restaurantInstance.post(`/menu/restaurants/${rid}/menu-items`, data);
};

const getMenuList = (uid, rid) => {
  return HttpAxios.restaurantInstance.get(`/menu/restaurants/${rid}/menu-items`);
};

const getMenuItemById = (mid) => {
  return HttpAxios.restaurantInstance.get(`/menu/restaurants/menu-items/${mid}`);
};

const updateMenuItemById = (rid, mid, data) => {
  return HttpAxios.restaurantInstance.put(`/menu/restaurants/${rid}/menu-items/${mid}`, data);
};

const getProfile = (uid) => {
  return HttpAxios.restaurantInstance.get(`/owners/${uid}`);
};

const updateProfile = (uid, data) => {
  return HttpAxios.restaurantInstance.put(`/owners/${uid}`, data);
};

const getOrderList = (rid) => {
  return HttpAxios.restaurantInstance.get(`/orders/restaurants/${rid}/orders`);
};

const updatetOrderStatus = (rid, data) => {
  return HttpAxios.restaurantInstance.put(`/orders/restaurants/${rid}/orders`, data);
};

const getOrderById = (oid) => {
  return HttpAxios.restaurantInstance.get(`/orders/${oid}`);
};

const deactivateRestaurant = (rid) => {
  return HttpAxios.restaurantInstance.delete(`/restaurants/${rid}`);
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