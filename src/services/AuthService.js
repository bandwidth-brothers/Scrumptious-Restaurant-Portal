import axios from "axios";

const API_URL = "https://52.15.235.234:8080/";

class AuthService {
    async login(username, password) {

        const response = await axios
            .post("auth/login", {
                username,
                password
            }, {baseURL: API_URL});
            
        if(response.data.token) {            
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    }

    async register(data) {

        const response = await axios
            .post("restaurant/owners/register", data, {baseURL: API_URL});
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
