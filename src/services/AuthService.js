import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
    async login(username, password) {

        const response = await axios
            .post(API_URL + "login", {
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
            .post("http://localhost:8080/restaurant/owner/register", data);

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