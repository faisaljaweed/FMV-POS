// import { Outlet, useNavigate } from "react-router-dom";
// import Home from "./Home";
// import CustomButton from "../../Components/Button";
// import { useAppDispatch } from "../../store/hooks";
// import { logoutUserThunk } from "../../store/userSlice";
// import { toast } from "react-toastify";

// const VendorDashboard = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     dispatch(logoutUserThunk())
//       .unwrap()
//       .then(() => {
//         navigate("/");
//         localStorage.clear();
//         toast.success("Logout Successfully");
//       })
//       .catch(() => {
//         toast.error("Failed Logout");
//       });
//   };
//   return (
//     <div className="flex flex-col md:flex-row w-full h-screen">
//       {/* Sidebar */}
//       <div className="w-full md:w-[20%] lg:w-[15%] bg-gray-800 text-white p-4 flex flex-col items-center">
//         <Home />
//       </div>

//       {/* Main Content */}
//       <main className="w-full md:w-[80%] lg:w-[85%] relative p-4 overflow-auto bg-[#f1f5f9]">
//         {/* Logout Button in top-right */}
//         <div className="absolute top-4 right-4">
//           <CustomButton onClick={handleLogout}>Logout</CustomButton>
//         </div>

//         {/* Page Outlet */}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default VendorDashboard;

import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDashboard } from "../../../src/context/DashboardContext";

const VendorDashboard: React.FC = () => {
  const { sidebarOpen, closeSidebar } = useDashboard();
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
