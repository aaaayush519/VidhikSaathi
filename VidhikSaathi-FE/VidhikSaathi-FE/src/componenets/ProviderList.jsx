import { useState, useEffect } from "react";
import ProviderService from "../services/ProviderService";
import ProviderCard from "./ProviderCard";

function ProviderList() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    ProviderService.findProviders()
      .then((response) => {
        setProviders(response.data);
        console.log("Providers Fetched", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    // Enhanced styling for the main container
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Title for the provider list */}
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10 tracking-tight leading-tight">
        Our Trusted Legal Service Providers
      </h2>

      {/* Conditional rendering for no providers found */}
      {providers.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600 font-medium p-6 bg-white rounded-lg shadow-lg">
            No legal service providers found at the moment. Please check back later!
          </p>
        </div>
      )}

      {/* Grid layout for provider cards */}
      {providers.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6">
          {providers.map((provider) => (
            <div key={provider.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              {/* ProviderCard component remains unchanged, assuming it has its own good styling */}
              <ProviderCard provider={provider} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProviderList;