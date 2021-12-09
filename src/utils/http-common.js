import axios from "axios";
import AuthService from "../services/AuthService";
import { environment } from "../environment";

const auth = AuthService.getCurrentUser();


export default axios.create({
  baseURL: environment.BASE_RESTAURANT_URL,
  headers: {
    "Content-type": "application/json",
    "Authorization": auth ? auth.token : ""
  }
});