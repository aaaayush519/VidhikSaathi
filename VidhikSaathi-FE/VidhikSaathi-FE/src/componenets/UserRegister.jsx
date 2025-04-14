import { useForm } from "react-hook-form";
import UserService from "../services/UserService";
const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data)=>{
    // console.log(data);
    UserService.registerUser(data)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
            type="text"
            placeholder="Full Name"
            {...register("name", {required:{value:true , message:"Name is Required"}})}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
            type="email"
            placeholder="example@xyz.com"
            {...register("email", {required:{value:true , message:"Email is Required"}})}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
            type="tel"
            placeholder="mobile"
            {...register("phone", {required:{value:true , message:"Phone number is Required"}})}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
        <select
            {...register("role",{required:{value:true , message:"Role is required"}})}
            defaultValue="CLIENT"
        >
            <option value="CLIENT">Client</option>
            <option value="Provider">Serivice Provider</option>
        </select>
        {errors.role && <p>errors.role.message</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default UserRegister;
