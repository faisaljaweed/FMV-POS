import { Outlet, useLocation } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminDashboard = () => {
  const { sidebarOpen, closeSidebar } = useDashboard();
  const location = useLocation();

  //   // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
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

export default AdminDashboard;
