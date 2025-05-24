import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const [greeting, setGreeting] = useState('Welcome to VidhikSaathi!');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl leading-tight">
            <span className="block drop-shadow-lg">{greeting}</span>
            <span className="block text-indigo-700 mt-4 animate-pulse">Your Legal Companion</span>
          </h1>
          <p className="mt-8 text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Connecting you with trusted legal professionals, effortlessly.
            Find the right support for your legal needs, right here.
          </p>
          <div className="mt-12">
            <button
              onClick={() => setGreeting('VidhikSaathi: Your Legal Journey Starts Here!')}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Learn More
              <svg className="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white shadow-inner">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-16 leading-tight">
            How VidhikSaathi Empowers You
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-12 md:space-y-0 items-center justify-center">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-3xl border border-blue-100">
              <div className="text-center">
                <div className="p-4 bg-indigo-100 rounded-full inline-flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Providers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Easily browse and discover a diverse network of qualified legal professionals tailored to your specific needs.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-3xl border border-blue-100">
              <div className="text-center">
                <div className="p-4 bg-purple-100 rounded-full inline-flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Request Services</h3>
                <p className="text-gray-600 leading-relaxed">
                  Directly send service requests to providers, initiating a seamless path to getting the legal help you require.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-3xl border border-blue-100">
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full inline-flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Secure & Simple</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enjoy a secure and user-friendly platform designed to simplify your legal journey from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 text-center bg-indigo-700 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Find Your Legal Saathi?
          </h2>
          <p className="text-xl sm:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            Join VidhikSaathi today and experience a new era of legal accessibility.
          </p>
          <button
            onClick={() => navigate("/findProviders")}
            className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-lg font-semibold rounded-full shadow-xl text-indigo-700 bg-white hover:bg-gray-100 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Get Started Now
            <svg className="ml-3 -mr-1 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;