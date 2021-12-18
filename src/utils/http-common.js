import axios from "axios";
import AuthService from "../services/AuthService";

const auth = AuthService.getCurrentUser();

const restaurantInstance = axios.create({
  baseURL: "http://localhost:8080/restaurant",

  headers: {
    "Content-type": "application/json",
    "Authorization": auth ? auth.token : ""
  }
});

const orderInstance = axios.create({
  baseURL: "http://localhost:8080/order",
  headers: {
    "Content-type": "application/json",
    "Authorization": auth ? auth.token : ""
  }
});

export const HttpAxios = {
  restaurantInstance,
  orderInstance
};
