import axios from "axios";
import AuthService from "../services/AuthService";

const auth = AuthService.getCurrentUser();

export default axios.create({
  baseURL: "http://localhost:8080/restaurant",
  headers: {
    "Content-type": "application/json",
    "Authorization": auth ? auth.token : ""
  }
});