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
        console.log(response)
      })
      .catch((err) => console.error("Status update failed", err));
  };

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
              {req.status!=="FINISHED"&&
              <><p><span className="font-semibold">Update Status:</span></p>
              <form className="flex gap-2" onSubmit={(e) => handleStatusSubmit(e, req.id)}>
                <select
                  value={statusUpdates[req.id] || req.status}
                  onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </form></>}
              <p className="text-sm text-gray-500">
                {new Date(req.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
