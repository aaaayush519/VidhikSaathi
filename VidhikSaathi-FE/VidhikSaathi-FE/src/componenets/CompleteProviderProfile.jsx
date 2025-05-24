import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import ProviderService from '../services/ProviderService';
import RequestService from '../services/RequestService'; // This import seems unused, but I'll leave it as per instruction

const CompleteProviderProfile = () => {
  const [providerProfile, setProviderProfile] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // State for success message
  const {
    register,
    handleSubmit,
    setValue, // Added setValue from react-hook-form
    formState: { errors }
  } = useForm();

  useEffect(() => {
    ProviderService.getProviderDetailsByUsername()
      .then((response) => {
        console.log(response.data);
        setProviderProfile(response.data);
        // Set form default values if profile already exists for editing (though current form only for completion)
        if (response.data) {
          setValue("userId", response.data.userId);
          // If profile is already complete, populate existing fields
          if (response.data.completionStatus) {
            setValue("barRegistrationNumber", response.data.barRegistrationNumber);
            setValue("bio", response.data.bio);
            setValue("expertise", response.data.expertise);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setValue]); // Add setValue to dependency array

  const onSubmit = async (data) => {
    try {
      const response = await ProviderService.completeProfile(data);
      console.log(response);
      setProviderProfile(prev => ({ ...prev, completionStatus: true, ...data })); // Update local state
      setSubmissionSuccess(true); // Show success message
      // Optionally, refetch profile to ensure latest data
      // ProviderService.getProviderDetailsByUsername().then(res => setProviderProfile(res.data));
    } catch (error) {
      console.log(error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    // Main container with increased padding top for navbar
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
      {/* Profile card styling */}
      <div className="max-w-2xl w-full mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-100 transform transition duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Your Provider Profile</h2>

        {/* Basic Profile Details */}
        <div className="space-y-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Username:</span> <span className="font-medium">{providerProfile.username}</span></p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Name:</span> <span className="font-medium">{providerProfile.name}</span></p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Email:</span> <span className="font-medium">{providerProfile.email}</span></p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Phone:</span> <span className="font-medium">{providerProfile.phone}</span></p>
        </div>

        {/* Conditional Rendering for Profile Completion */}
        {providerProfile.completionStatus === false ? (
          // Form to complete profile
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-center text-purple-700">Complete Your Professional Details</h3>
            <p className="text-gray-600 text-center mb-6">Fill out the following information to make your profile visible to clients.</p>

            <input
              type="hidden"
              {...register("userId")}
              value={providerProfile.userId || ''} // Ensure value is not undefined initially
            />

            <div>
              <label htmlFor="barRegistrationNumber" className="sr-only">Bar Registration Number</label>
              <input
                id="barRegistrationNumber"
                type="text"
                placeholder="Bar Registration Number"
                {...register("barRegistrationNumber", {
                  required: {
                    value: true,
                    message: "Bar Registration Number is required"
                  }
                })}
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out ${
                  errors.barRegistrationNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.barRegistrationNumber && (
                <p className="text-red-600 text-sm mt-2 font-medium">{errors.barRegistrationNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="sr-only">Bio</label>
              <textarea
                id="bio"
                placeholder="Brief Bio (e.g., your experience, approach)"
                rows="4" // Provide more space for bio
                {...register("bio", {
                  required: {
                    value: true,
                    message: "Bio is required"
                  },
                  minLength: {
                    value: 20,
                    message: "Bio should be at least 20 characters long"
                  }
                })}
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out resize-y ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                }`}
              ></textarea>
              {errors.bio && (
                <p className="text-red-600 text-sm mt-2 font-medium">{errors.bio.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="expertise" className="sr-only">Expertise</label>
              <input
                id="expertise"
                type="text"
                placeholder="Expertise (e.g., Criminal Law, Family Law, Corporate Law)"
                {...register("expertise", {
                  required: {
                    value: true,
                    message: "Expertise is required"
                  }
                })}
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out ${
                  errors.expertise ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expertise && (
                <p className="text-red-600 text-sm mt-2 font-medium">{errors.expertise.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-purple-700 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Complete Profile
            </button>
          </form>
        ) : (
          // Display for completed profile
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-center text-green-700">Profile Complete!</h3>
            <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-900">Bar Registration Number:</span> <span className="font-medium">{providerProfile.barRegistrationNumber}</span></p>
            <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-900">Bio:</span> <span className="font-medium">{providerProfile.bio}</span></p>
            <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-900">Expertise:</span> <span className="font-medium">{providerProfile.expertise}</span></p>
            {submissionSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-6 text-center" role="alert">
                <strong className="font-bold">Success!</strong> Your profile has been updated.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteProviderProfile;