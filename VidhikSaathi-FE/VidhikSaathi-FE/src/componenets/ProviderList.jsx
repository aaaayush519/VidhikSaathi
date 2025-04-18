import axios from "axios";
import { useState,useEffect, Profiler } from "react";
import ProviderService from "../services/ProviderService";
import ProviderCard from "./ProviderCard";

function ProviderList(){
    const[providers,setProviders] = useState([]);

    useEffect(() => {
      ProviderService.findProviders()
      .then((response)=>{
            setProviders(response.data);
            console.log("Providers Fetched",response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
    }, [])

    return(
        <div className="flex flex-wrap p-9 gap-3 w-full">
            {providers.length === 0&& <p className="text-red-100">No Providers Found</p>}
           {providers.length > 0 &&
                providers.map(provider => (
                    <div key={provider.id}>
                      <ProviderCard provider={provider}/>
                    </div>
                ))}
        </div>
    )
    
}
export default ProviderList;