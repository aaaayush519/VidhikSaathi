import React, { useEffect, useState } from "react";
import RequestService from "../services/RequestService";

const ProviderDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    RequestService.providerRequests()
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleStatusSubmit = (e, id) => {
    e.preventDefault();
    const newStatus = statusUpdates[id];

    if (!newStatus) return;

    RequestService.updateRequestStatus(id, newStatus)
      .then((response) => {
        console.log(response);
        // Optionally, refetch requests to show updated status immediately
        fetchRequests();
      })
      .catch((err) => console.error("Status update failed", err));
  };

  // Helper function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-800";
      case "IN PROGRESS":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    // Main container with background and padding for navbar
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-indigo-50 to-purple-100 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight leading-tight">
        Incoming Service Requests
      </h2>

      {requests.length === 0 ? (
        // Styling for "No requests yet" message
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600 font-medium p-6 bg-white rounded-lg shadow-lg">
            No service requests found at the moment.
          </p>
        </div>
      ) : (
        // Grid layout for request cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {requests.map((req) => (
            // Individual request card styling
            <div
              key={req.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col gap-3 transform transition duration-300 hover:shadow-xl hover:scale-[1.01]"
            >
              {/* Client details */}
              <p className="text-lg text-gray-800">
                <span className="font-semibold text-indigo-700">Client:</span> <span className="ml-1">{req.clientName}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-indigo-700">Email:</span> <span className="ml-1">{req.clientEmail}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-indigo-700">Phone:</span> <span className="ml-1">{req.clientPhoneNumber}</span>
              </p>

              {/* Status Badge */}
              <div className="mt-2 mb-4">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(req.status)}`}>
                  Status: {req.status}
                </span>
              </div>

              {/* Status Update Form (conditionally rendered) */}
              {req.status !== "COMPLETED" && ( // Changed from "FINISHED" to "COMPLETED" for consistency
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-semibold text-gray-800 mb-2">Update Status:</p>
                  <form className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center" onSubmit={(e) => handleStatusSubmit(e, req.id)}>
                    <select
                      value={statusUpdates[req.id] || req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      className="flex-grow border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 bg-white"
                    >
                      <option value="PENDING">PENDING</option>
                     
                      <option value="IN PROGRESS">IN PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      
                    </select>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transform transition duration-300 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                  </form>
                </div>
              )}

              {/* Request Timestamp */}
              <p className="text-sm text-gray-500 mt-4">
                Requested on <span className="font-medium">{new Date(req.createdAt).toLocaleString()}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;