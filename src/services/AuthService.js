import axios from "axios";

const API_URL = "${API_ENDPOINT}:8080/";

class AuthService {
    async login(username, password) {

        const response = await axios
            .post(API_URL + "auth/login", {
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
            .post(API_URL + "restaurant/owners/register", data);
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
