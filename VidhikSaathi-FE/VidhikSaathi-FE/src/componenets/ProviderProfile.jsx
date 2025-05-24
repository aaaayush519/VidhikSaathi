import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProviderService from "../services/ProviderService";
import RequestService from "../services/RequestService";

 function ProviderProfile(){
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    ProviderService.getProviderProfile(id).then((res) => {
      setProvider(res.data);
    });
  }, []);

  if (!provider) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        {/* Name */}
        <h1 className="text-3xl font-bold text-blue-900 mb-6">{provider.name}</h1>

        {/* Flex Container for About & Details */}
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-6 space-y-6 md:space-y-0">
          {/* About Section */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">👤 About</h2>
            <p className="text-gray-700 leading-relaxed">{provider.bio}</p>
          </div>

          {/* Details Section */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📄 Details</h2>
            <ul className="text-gray-700 space-y-2">
              <li>
                <span className="font-medium">🎓 Expertise:</span> {provider.expertise}
              </li>
              <li>
                <span className="font-medium">🆔 Bar Registration #:</span> {provider.barRegistrationNumber}
              </li>
              <li>
                <span className="font-medium">📧 Email:</span>{" "}
                <a href={`mailto:${provider.email}`} className="text-blue-600 hover:underline">
                  {provider.email}
                </a>
              </li>
              <li>
                <span className="font-medium">📞 Phone:</span> {provider.phone || provider.mobile}
              </li>
              <li>
                <span className="font-medium">⭐ Rating:</span>{" "}
                <span className="text-yellow-600">{provider.rating.toFixed(1)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button 
            onClick={()=>{
              RequestService.registerRequest(provider.id)
              .then(()=>{
                alert("Request sent successfully! Provider will contact you.");
              })
              .catch((error)=>{
                console.error("Error sending request:", error);
                alert("Failed to send request. Please login again or try later.");
              }
              )
            }}
          className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
            Request Legal Service
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProviderProfile;