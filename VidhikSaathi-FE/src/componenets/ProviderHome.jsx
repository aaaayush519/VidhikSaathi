import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProviderHome() {
  const [greeting, setGreeting] = useState('Welcome, Legal Professional!');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setGreeting(`Welcome, ${storedUsername}!`); 
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-900 font-sans pt-20">
      {/* Hero Section for Providers */}
      <div className="relative overflow-hidden py-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl leading-tight">
            <span className="block drop-shadow-lg">{greeting}</span>
            <span className="block text-indigo-700 mt-4 animate-pulse">Your Dashboard Awaits</span>
          </h1>
          <p className="mt-8 text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Manage your service requests, update your profile, and connect with clients seeking your expertise.
          </p>
          <div className="mt-12">
            
          </div>
        </div>
      </div>

      {/* Features Section for Providers */}
      <div className="py-20 bg-white shadow-inner">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-16 leading-tight">
            How VidhikSaathi Supports Your Practice
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-12 md:space-y-0 items-center justify-center">
            {/* Feature 1: Manage Requests */}
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-3xl border border-purple-100">
              <div className="text-center">
                <div className="p-4 bg-indigo-100 rounded-full inline-flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Manage Service Requests</h3>
                <p className="text-gray-600 leading-relaxed">
                  Efficiently view, accept, and manage incoming legal service requests from clients.
                </p>
              </div>
            </div>

            {/* Feature 2: Profile Management */}
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-3xl border border-blue-100">
              <div className="text-center">
                <div className="p-4 bg-purple-100 rounded-full inline-flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Maintain Your Profile</h3>
                <p className="text-gray-600 leading-relaxed">
                  Keep your professional profile updated to attract more clients and showcase your expertise.
                </p>
              </div>
            </div>

            {/* Feature 3: Client Engagement */}
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-3xl border border-green-100">
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full inline-flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Seamless Client Communication</h3>
                <p className="text-gray-600 leading-relaxed">
                  Communicate directly with clients through the platform for streamlined service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 text-center bg-purple-700 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Grow Your Practice?
          </h2>
          <p className="text-xl sm:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            Utilize VidhikSaathi's tools to expand your reach and efficiently manage your legal services.
          </p>
          <button
            onClick={() => navigate("/providerDashboard")}
            className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-lg font-semibold rounded-full shadow-xl text-purple-700 bg-white hover:bg-gray-100 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Access Your Dashboard
            <svg className="ml-3 -mr-1 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProviderHome;