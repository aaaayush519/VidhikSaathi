import axios from "axios"
const Provider_API_BASE_URL = "http://localhost:8080/api/providers";

class ProviderService{
    findProviders=()=>{
        const response = axios.get(Provider_API_BASE_URL);
        return response;
    }
}
export default new ProviderService();