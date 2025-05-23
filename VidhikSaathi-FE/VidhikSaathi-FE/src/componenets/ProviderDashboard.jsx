import React, { useEffect, useState } from "react";
import RequestService from "../services/RequestService";

const ProviderDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    RequestService.providerRequests()
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Incoming Service Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-4 rounded-lg shadow flex flex-col gap-1 bg-white"
            >
              <p><span className="font-semibold">Client:</span> {req.clientName}</p>
              <p><span className="font-semibold">Email:</span> {req.clientEmail}</p>
              <p><span className="font-semibold">Phone:</span> {req.clientPhoneNumber}</p>
              <p><span className="font-semibold">Status:</span> {req.status}</p>
              <p className="text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
