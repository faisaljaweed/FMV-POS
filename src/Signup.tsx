import Input from "./Components/Input";
import CustomButton from "./Components/Button";
import { useAppDispatch } from "./store/hooks";
import { registerUserThunk } from "./store/userSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    const username = formData.get("username")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";
    const role = formData.get("role")?.toString() || "";

    if (!email || !username || !password || !confirmPassword || !role) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    try {
      await dispatch(
        registerUserThunk({ username, email, password, confirmPassword, role })
      ).unwrap();
      toast.success("Registration successful!");

      target.reset();
    } catch (error: any) {
      toast.error(error?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">SIGNUP</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">
            USERNAME
          </label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your UserName"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            EMAIL
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your Email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block font-medium">
            Role
          </label>
          <Input
            id="role"
            name="role"
            type="text"
            placeholder="Enter your Role"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">
            PASSWORD
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            required
            // minLength={6}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-medium">
            CONFIRM PASSWORD
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your Password"
            required
            // minLength={6}
          />
        </div>

        <CustomButton type="submit" className="w-full">
          Signup
        </CustomButton>
      </form>
    </div>
  );
};

export default Signup;
