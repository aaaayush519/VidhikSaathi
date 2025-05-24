import { useForm } from "react-hook-form";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await UserService.registerUser(data)
      .then((response) => {
        console.log(response);
        navigate("/register-success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center h-153 bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create an Account
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("name", {
              required: { value: true, message: "Name is Required" },
            })}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="example@xyz.com"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", {
              required: { value: true, message: "Email is Required" },
            })}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("phone", {
              required: { value: true, message: "Phone number is Required" },
            })}
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
          <select
            className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("role", {
              required: { value: true, message: "Role is required" },
            })}
            defaultValue="Client"
          >
            <option value="Client">Client</option>
            <option value="Provider">Legal Service Provider</option>
          </select>
          {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 6,
                message: "Password length should not be less than 6"
              }
            })}
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
