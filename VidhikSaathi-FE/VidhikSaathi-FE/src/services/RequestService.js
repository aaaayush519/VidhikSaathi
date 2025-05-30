import axios from "axios";
//const REQUEST_API_BASE_URL = "http://localhost:8080/api/requests";

const BASE_API_URL = import.meta.env.VITE_APP_API_BASE_URL;
const REQUEST_API_BASE_URL = `${BASE_API_URL}/requests`;

const token = localStorage.getItem("jwtToken");
const username = localStorage.getItem("username");
class RequestService{
    registerRequest = (providerId)=>{
        let response =  axios.post(REQUEST_API_BASE_URL,{providerId},{
            headers : {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
    providerRequests =()=>{
        let response = axios.get(REQUEST_API_BASE_URL+"/providerRequests",{
            headers: {
                Authorization : `Bearer ${token}`,
            },
        });
        return response;
    }
    getRequests=()=>{
        let response = axios.get(REQUEST_API_BASE_URL+"/userRequests",{
            headers: {
                Authorization : `Bearer ${token}`,
            },
        });
        return response;
    }
    updateRequestStatus=(id, newStatus)=>{
        let response = axios.put(REQUEST_API_BASE_URL+"/updateStatus/"+id+"?newStatus="+newStatus,null,{
            headers :{
                Authorization :`Bearer ${token}`,
            },
        });
        return response;
    }

}
export default new RequestService();