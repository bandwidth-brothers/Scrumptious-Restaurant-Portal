import axios from "axios";

const API_URL = "http://localhost:9040/";

class AuthService {
    async login(username, password, rememberMe) {

        const response = await axios
            .post(API_URL + "login", {
                username,
                password
            });
            
        if(response.data.token) {            
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        if(rememberMe){
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        }else{
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }
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