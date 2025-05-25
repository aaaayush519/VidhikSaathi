import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username"); 

  return (
    // Enhanced Navbar container
    <nav className=" top-0 left-0 right-0 z-50 bg-indigo-700 text-white px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between shadow-lg">
     
      <Link to="/userhome" className="text-2xl sm:text-3xl font-extrabold italic tracking-tight hover:text-indigo-100 transition duration-300 ease-in-out">
        VidhikSaathi
        {username && <span className="text-base font-normal ml-2 opacity-80">({username})</span>} {/* Display username */}
      </Link>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-4 sm:space-x-6">
        {jwtToken === null && (
          <>
            <li>
              <Link to="/login" className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base sm:text-lg font-medium">
                Login
              </Link>
            </li>
            <li>
              <Link to="/userRegister" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out text-base sm:text-lg font-medium shadow">
                Register
              </Link>
            </li>
          </>
        )}
        {jwtToken !== null && (
          <>
            <li>
              <Link to="/findProviders" className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base sm:text-lg font-medium">
                Find Providers
              </Link>
            </li>
            <li>
              <Link to="/userRequests" className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base sm:text-lg font-medium">
                My Requests
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('jwtToken');
                  localStorage.removeItem('username'); // Clear username on logout
                  alert("Logged out successfully");
                  navigate("/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out text-base sm:text-lg font-medium shadow"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;