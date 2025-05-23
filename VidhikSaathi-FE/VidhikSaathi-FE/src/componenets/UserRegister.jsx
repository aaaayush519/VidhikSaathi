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

  const onSubmit = async(data) => {
    await UserService.registerUser(data)
      .then((response) => {
        console.log(response);
        navigate("/register-success")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center h-150 bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 shadow-md mt-15 rounded-xl h-120 p-8 w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Registration Page</h1>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-3 border rounded-lg"
          {...register("name", {
            required: { value: true, message: "Name is Required" },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="email"
          placeholder="example@xyz.com"
          className="w-full mb-3 p-3 border rounded-lg"
          {...register("email", {
            required: { value: true, message: "Email is Required" },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="tel"
          placeholder="mobile"
          className="w-full mb-3 p-3 border rounded-lg"
          {...register("phone", {
            required: { value: true, message: "Phone number is Required" },
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
        <select
        className="w-full mb-3 p-3 border rounded-lg"
          {...register("role", {
            required: { value: true, message: "Role is required" },
          })}
          defaultValue="Client"
        >
          <option value="Client">Client</option>
          <option value="Provider">Legal Service Provider</option>
        </select>
        {errors.role && <p>errors.role.message</p>}
        <input
          type="password"
          placeholder="password"
          className="w-full mb-3 p-3 border rounded-lg"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength:{value:6 , message:"Password length should not be less than 6"}
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800" type="submit">Register</button>
      </form>
    </div>
  );
};
export default UserRegister;
