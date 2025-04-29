import React from "react";
import { useDashboard } from "../../context/DashboardContext";
import { logoutUserThunk } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { Bell, LogOut, Menu, User } from "lucide-react";

const Header: React.FC = () => {
  const { toggleSidebar } = useDashboard();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        navigate("/");
        localStorage.clear();
        toast.success("Logout Successfully");
      })
      .catch(() => {
        toast.error("Failed Logout");
      });
  };
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger menu */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:hidden"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>

          {/* Right: User section */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="View notifications"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            {/* User dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <div className="rounded-full bg-gray-200 p-1">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <span className="hidden md:inline-block ml-2 text-sm font-medium text-gray-700">
                  Admin User
                </span>
              </div>
            </div>

            {/* Logout button */}
            <button
              // onClick={handleLogout}
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-red-500 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
