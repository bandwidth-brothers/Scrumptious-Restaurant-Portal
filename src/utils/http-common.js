import axios from "axios";
import AuthService from "../services/AuthService";

const auth = AuthService.getCurrentUser();


export default axios.create({
  baseURL: "https://52.15.235.234:8080/restaurant",
  headers: {
    "Content-type": "application/json",
    "Authorization": auth ? auth.token : ""
  }
});
