import axios from "axios"
const Provider_API_BASE_URL = "http://localhost:8080/api/providers";
const token = localStorage.getItem("jwtToken");
class ProviderService{
    findProviders=()=>{
        let response = axios.get(Provider_API_BASE_URL,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return response;
    }
    getProviderProfile = (id)=>{
         let response = axios.get(Provider_API_BASE_URL+"/"+id , {
            headers:{
                Authorization: `Bearer ${token}`,
            },
         });
         return response;
    }

}
export default new ProviderService();