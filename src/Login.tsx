import { useState } from "react";
import CustomButton from "./Components/Button";
import Input from "./Components/Input";
import LoginIcon from "@mui/icons-material/Login";
import { toast } from "react-toastify";
import { useAppDispatch } from "./store/hooks";
import { loginUserThunk } from "./store/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents form from reloading
    setEmail("");
    setPassword("");
    try {
      await dispatch(loginUserThunk({ email, password })).unwrap();
      const role = localStorage.getItem("role");
      if (role == "admin") {
        navigate("/admin_dashboard");
      } else if (role == "vendor") {
        navigate("/vendor-dashboard");
      }
      toast.success("Login successful!");
      // Redirect or perform other actions after successful login
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <div className="mb-4">
            <label className="block font-medium">Email:</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Password:</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <CustomButton
            type="submit"
            startIcon={<LoginIcon />}
            className="w-full"
          >
            {/* {loading ? "LOGGING IN..." : "LOGIN"} */}
            Login
          </CustomButton>
        </form>
      </div>
    </>
  );
};

export default Login;
