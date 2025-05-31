import axios from "axios"
//const USER_API_BASE_URL = "http://localhost:8080/api/users";
const BASE_API_URL = import.meta.env.VITE_APP_API_BASE_URL;
const USER_API_BASE_URL = `${BASE_API_URL}/users`;
const token = localStorage.getItem("jwtToken");
class UserService{
    registerUser = (user)=>{
        return axios.post(USER_API_BASE_URL + "/register",user)
    }
    loginUser = (credentials)=>{
        return axios.post(USER_API_BASE_URL + "/login",credentials)
    }
    getRole = (Token)=>{
        let user = axios.get(USER_API_BASE_URL+"/role",{
                headers: {
                    Authorization : `Bearer ${Token}`,
                },
            });
            return user;
    }
    
}
export default new UserService();