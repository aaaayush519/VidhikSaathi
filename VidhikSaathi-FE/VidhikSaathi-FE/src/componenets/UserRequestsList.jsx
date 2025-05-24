import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestService from "../services/RequestService";
import UserRequest from "./UserRequest";

const UserRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
 
useEffect(() => {
  RequestService.getRequests()
    .then((res) => {
      setRequests(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Service Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">You haven’t requested any services yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id}>
              <UserRequest req={req}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRequestsList;
