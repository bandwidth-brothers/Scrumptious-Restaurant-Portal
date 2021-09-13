import http from "../utils/http-common";

const getRestaurantList = () => {
    return http.get("/admin/restaurants/");
};

const createRestaurant = (data) => {
    return http.post(`/admin/restaurants/`, data);
  };

const createMenu = (id, data) => {
    return http.post(`/admin/restaurants/${id}/menu-items`, data);
  };

export const RestaurantService =  {
    getRestaurantList,
    createRestaurant,
    createMenu
};