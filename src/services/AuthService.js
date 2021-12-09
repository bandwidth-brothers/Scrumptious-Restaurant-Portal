import axios from "axios";
import { environment } from "../environment";

const Login_URL = environment.LOGIN_URL;
const BASE_RESTAURANT_URL = environment.BASE_RESTAURANT_URL;

class AuthService {
    async login(username, password) {

        const response = await axios
            .post(Login_URL, {
                username,
                password
            });
            
        if(response.data.token) {            
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    }

    async register(data) {

        const response = await axios
            .post(BASE_RESTAURANT_URL + "/owners/register", data);
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();