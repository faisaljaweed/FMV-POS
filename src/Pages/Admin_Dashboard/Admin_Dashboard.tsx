import { toast } from "react-toastify";
import CustomButton from "../../Components/Button";
import { useAppDispatch } from "../../store/hooks";
import { logoutUserThunk } from "../../store/userSlice";
import Home from "./Home";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        navigate("/");
        localStorage.clear();
        toast.success(`Logout Successfully`);
      })
      .catch(() => {
        toast.error(`Logout Failed`);
      });
  };
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="w-[20%] lg:w-[15%] bg-gray-800 text-white p-4 flex flex-col items-center">
        <Home />
      </div>

      {/* Main Content Area */}
      <div className="w-[80%] lg:w-[85%] relative bg-[#f1f5f9] p-4 overflow-auto">
        {/* Logout Button Top-Right */}
        <div className="absolute top-4 right-4">
          <CustomButton onClick={handleLogout}>Logout</CustomButton>
        </div>

        {/* Outlet for pages */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
