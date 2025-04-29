import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { registerUserThunk } from "../../store/userSlice";

const Add_Vendor = () => {
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
    <div className="py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Vendor</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  id="username"
                  name="username"
                  placeholder="Enter your UserName"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  EMAIL
                </label>
                <input
                  id="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <input
                  id="role"
                  name="role"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                  placeholder="Enter your Role"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PASSWORD
                </label>
                <input
                  id="password"
                  name="password"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="password"
                  placeholder="Enter your Password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CONFIRM PASSWORD
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="password"
                  placeholder="Confirm your Password"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Vendor;
