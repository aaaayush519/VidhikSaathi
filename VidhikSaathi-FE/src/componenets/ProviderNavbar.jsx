import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProviderNavbar() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu on navigation (optional)
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-indigo-800 text-white px-4 sm:px-6 lg:px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/providerhome"
          className="text-2xl sm:text-3xl font-extrabold italic tracking-tight hover:text-indigo-200 transition duration-300 ease-in-out"
          onClick={handleLinkClick}
        >
          VidhikSaathi
          {username && (
            <span className="text-base font-normal ml-2 opacity-80">( {username} )</span>
          )}
        </Link>

        {/* Hamburger menu button (visible on small screens) */}
        <button
          onClick={toggleMenu}
          className="sm:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Simple hamburger icon */}
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center space-x-4 sm:space-x-6">
          {jwtToken === null && (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base sm:text-lg font-medium"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/userRegister"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out text-base sm:text-lg font-medium shadow"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {jwtToken !== null && (
            <>
              <li>
                <Link
                  to="/myProviderProfile"
                  className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base sm:text-lg font-medium"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/providerDashboard"
                  className="text-white hover:text-indigo-200 transition duration-300 ease-in-out text-base sm:text-lg font-medium"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("username");
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
      </div>

      {/* Mobile Menu (visible when toggled) */}
      {menuOpen && (
        <ul className="sm:hidden mt-4 space-y-3 px-2">
          {jwtToken === null && (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="block text-white hover:text-indigo-200 text-base font-medium"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/userRegister"
                  onClick={handleLinkClick}
                  className="block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-base font-medium shadow"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {jwtToken !== null && (
            <>
              <li>
                <Link
                  to="/myProviderProfile"
                  onClick={handleLinkClick}
                  className="block text-white hover:text-indigo-200 text-base font-medium"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/providerDashboard"
                  onClick={handleLinkClick}
                  className="block text-white hover:text-indigo-200 text-base font-medium"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("username");
                    alert("Logged out successfully");
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="block w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-base font-medium shadow"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default ProviderNavbar;
