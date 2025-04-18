import { Link } from "react-router-dom";
function Navbar(){
    return(
        <nav className="bg-blue-900 text-white px-9 py-6 flex  justify-between items-center shadow">
            <Link to="/" className="text-2xl font-bold italic">VidhikSaathi</Link>
            <ul className="flex space-x-4">
                <li><Link to="/findProviders" className="hover:text-lg">Find Providers</Link></li>
                <li><Link to="/login" className="hover:text-lg">Login</Link></li>
                <li><Link to="/userRegister" className="hover:text-lg">Register</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar;