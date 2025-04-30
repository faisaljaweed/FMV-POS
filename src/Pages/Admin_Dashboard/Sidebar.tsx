import {
  CalendarPlus,
  ClipboardList,
  PackagePlus,
  ShoppingBag,
  X,
} from "lucide-react";
import React from "react";
import { useDashboard } from "../../context/DashboardContext";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
const navItems = [
  {
    path: "/admin_dashboard/add_vendor",
    name: "Add Vendor",
    icon: CalendarPlus,
  },
  {
    path: "/admin_dashboard/get-vendor",
    name: " Get Vendor",
    icon: PackagePlus,
  },
  {
    path: "/admin_dashboard/get-product",
    name: "Get Product",
    icon: ClipboardList,
  },
  {
    path: "/admin_dashboard/get-booking",
    name: " Get Booking",
    icon: ShoppingBag,
  },
];

const Sidebar: React.FC = () => {
  const { sidebarOpen, closeSidebar } = useDashboard();
  return (
    <motion.aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-teal-800 to-teal-900 text-white shadow-xl transform lg:translate-x-0 lg:static lg:inset-auto lg:z-auto transition-transform duration-300 ease-in-out 
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
    `}
      initial={false}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-5 border-b border-teal-700">
          <Logo />
          <button
            className="p-1 rounded-full hover:bg-teal-700 transition lg:hidden focus:outline-none focus:ring-2 focus:ring-white"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 text-center text-white">
            Vendor Dashboard
          </h2>

          <nav className="grid gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-teal-800 shadow-md"
                      : "text-white hover:bg-teal-700/50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 mr-3 ${
                        isActive ? "text-teal-600" : "text-teal-300"
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-teal-700 text-sm text-teal-300 text-center">
          Admin Portal &copy; {new Date().getFullYear()}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
