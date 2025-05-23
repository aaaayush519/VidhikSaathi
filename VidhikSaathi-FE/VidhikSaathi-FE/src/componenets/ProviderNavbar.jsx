import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
function ProviderNavbar(){
    const navigate = useNavigate();
    return(
        <nav className="bg-blue-900 text-white px-9 py-6 flex  justify-between items-center shadow">
            <Link to="/" className="text-2xl font-bold italic">VidhikSaathi(Providers)</Link>
            <ul className="flex space-x-4">
                
                <li><Link to="/login" className="hover:text-lg">Login</Link></li>
                <li><Link to="/userRegister" className="hover:text-lg">Register</Link></li>
                <li><Link to="/providerDashboard" className="hover:text-lg">Service Requests</Link></li>
                <li><button 
                onClick={()=>{
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('username');
                    alert("Logged out successfully");
                    navigate("/login");
                }}
                 className="hover:text-lg">Logout</button></li>
            </ul>
        </nav>
    )
}
export default ProviderNavbar;