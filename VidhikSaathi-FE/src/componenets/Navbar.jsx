import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className=" top-0 left-0 right-0 z-50 bg-indigo-700 text-white px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between shadow-lg">
      <Link to="/userhome" className="text-2xl sm:text-3xl font-extrabold italic tracking-tight hover:text-indigo-100 transition duration-300 ease-in-out">
        VidhikSaathi
        {username && <span className="text-base font-normal ml-2 opacity-80 hidden sm:inline">({username})</span>}
      </Link>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md p-2">
          {isMenuOpen ? (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <ul className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {jwtToken === null ? (
          <>
            <li>
              <Link to="/login" className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base lg:text-lg font-medium">
                Login
              </Link>
            </li>
            <li>
              <Link to="/userRegister" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out text-base lg:text-lg font-medium shadow">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/findProviders" className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base lg:text-lg font-medium">
                Find Providers
              </Link>
            </li>
            <li>
              <Link to="/userRequests" className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base lg:text-lg font-medium">
                My Requests
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('jwtToken');
                  localStorage.removeItem('username');
                  alert("Logged out successfully");
                  navigate("/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out text-base lg:text-lg font-medium shadow"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-indigo-800 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-6 md:hidden">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md p-2">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <ul className="flex flex-col items-center space-y-6">
            {jwtToken === null ? (
              <>
                <li>
                  <button onClick={() => handleNavLinkClick("/login")} className="text-white text-xl font-bold hover:text-indigo-200 transition duration-300 ease-in-out px-6 py-3 rounded-lg">
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavLinkClick("/userRegister")} className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-xl font-bold shadow transition duration-300 ease-in-out">
                    Register
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => handleNavLinkClick("/findProviders")} className="text-white text-xl font-bold hover:text-indigo-200 transition duration-300 ease-in-out px-6 py-3 rounded-lg">
                    Find Providers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavLinkClick("/userRequests")} className="text-white text-xl font-bold hover:text-indigo-200 transition duration-300 ease-in-out px-6 py-3 rounded-lg">
                    My Requests
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem('jwtToken');
                      localStorage.removeItem('username');
                      alert("Logged out successfully");
                      handleNavLinkClick("/login");
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-xl font-bold shadow transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
export default Navbar;