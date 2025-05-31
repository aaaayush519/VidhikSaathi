import { useState } from "react";
import ReviewService from "../services/ReviewService";

const UserRequest = ({ req }) => {
  const [review, setReview] = useState({ serviceRequestId: req.id, comment: '', rating: '' });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // State to show submission success

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', review);
    ReviewService.postReview(review)
      .then((response) => {
        console.log(response);
        setFeedbackSubmitted(true); // Set success state
        // Optionally, you might want to disable the form or show a success message permanently
      })
      .catch((error) => {
        console.log(error);
        // Handle error, maybe display an error message to the user
      });
    setReview({ comment: '', rating: '' }); // Clear form fields
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    // Main card container styling
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition duration-300 hover:shadow-xl hover:scale-[1.01]">
      {/* Request metadata */}
      <p className="text-sm text-gray-500 mb-2">
        Requested on <span className="font-medium">{new Date(req.createdAt).toLocaleString()}</span>
      </p>

      {/* Provider details */}
      <div className="space-y-2 mb-4">
        <p className="text-gray-800">
          <strong className="font-semibold text-indigo-700">Provider:</strong> <span className="ml-1">{req.providerName}</span>
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-indigo-700">Email:</strong> <span className="ml-1">{req.providerEmail}</span>
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-indigo-700">Phone:</strong> <span className="ml-1">{req.providerPhoneNumber}</span>
        </p>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(req.status)}`}>
          Status: {req.status}
        </span>
      </div>

      {/* Feedback Form (conditionally rendered) */}
      {req.status === "COMPLETED" && !feedbackSubmitted && (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Provide Feedback</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <textarea
              name="comment"
              value={review.comment}
              onChange={handleChange}
              placeholder="Share your experience here..."
              rows="2" // Increased rows for better initial appearance
              className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-y"
            />
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              value={review.rating}
              onChange={handleChange}
              placeholder="Rating (1-5)"
              className="w-full sm:w-32 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transform transition duration-300 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Feedback
          </button>
        </form>
      )}

      {req.status === "COMPLETED" && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center justify-center mt-4">
          <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="font-semibold">Feedback Submitted Successfully!</p>
        </div>
      )}
    </div>
  );
};
export default UserRequest;