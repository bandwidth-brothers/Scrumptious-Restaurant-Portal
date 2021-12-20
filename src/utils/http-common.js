import axios from "axios";
import { environment } from "environment";
import AuthService from "../services/AuthService";

const auth = AuthService.getCurrentUser();

const restaurantInstance = axios.create({
  baseURL: environment.BASE_RESTAURANT_URL,

  headers: {
    "Content-type": "application/json",
    "Authorization": auth ? auth.token : ""
  }
});

const orderInstance = axios.create({
  baseURL: environment.BASE_ORDER_URL,
  headers: {
    "Content-type": "application/json",
    "Authorization": auth ? auth.token : ""
  }
});

export const HttpAxios = {
  restaurantInstance,
  orderInstance
};
