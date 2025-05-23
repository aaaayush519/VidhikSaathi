import { useState } from "react";
import ReviewService from "../services/ReviewService";

const UserRequest = ({ req }) => {
  const [review, setReview] = useState({serviceRequestId:req.id , comment: '', rating: '' });

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', review);
    ReviewService.postReview(review)
    .then((response)=>{
        console.log(response)
    })
    .catch((error)=>{
        console.log(error);
    })
    setReview({ comment: '', rating: '' });
  };

  return (
    <div className="border p-4 rounded-lg shadow bg-white">
      <p className="text-sm text-gray-500">
        Requested on {new Date(req.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Provider:</strong> {req.providerName}
      </p>
      <p>
        <strong>Email:</strong> {req.providerEmail}
      </p>
      <p>
        <strong>Phone number:</strong> {req.providerPhoneNumber}
      </p>
      <p>
        <strong>Status:</strong> {req.status}
      </p>
      <p>
        <strong>Scheduled Time:</strong> {req.scheduledTime}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
          placeholder="Add your comment"
          rows="1"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={review.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Submit Feedback
      </button>
    </form>
    </div>
  );
};
export default UserRequest;
