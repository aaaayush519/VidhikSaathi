import { useState } from "react";
import { useForm } from "react-hook-form";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectToNavbar = async (newToken) => {
    const token = newToken;

    try {
      const role = await UserService.getRole(token);
      console.log("Role:", role.data);

      if (role.data === "PROVIDER") {
        navigate("/providerhome");
      } else {
        navigate("/userhome");
      }
    } catch (error) {
      console.error("Failed to fetch role:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("token requested")
      const response = await UserService.loginUser(data);
      localStorage.setItem("jwtToken", response.data);
      localStorage.setItem("username", data.username);
      console.log(response);
      redirectToNavbar(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-153 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("username", {
                required: { value: true, message: "Username is required" },
              })}
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
