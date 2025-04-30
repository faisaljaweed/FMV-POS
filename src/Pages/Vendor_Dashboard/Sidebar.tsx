import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  PackagePlus,
  ClipboardList,
  ShoppingBag,
  X,
} from "lucide-react";
import { useDashboard } from "../../../src/context/DashboardContext";
import Logo from "./Logo";

const navItems = [
  {
    path: "/vendor-dashboard/add-booking",
    name: "Add Booking",
    icon: CalendarPlus,
  },
  {
    path: "/vendor-dashboard/add-product",
    name: "Add Product",
    icon: PackagePlus,
  },
  {
    path: "/vendor-dashboard/get-booking",
    name: "Get Booking",
    icon: ClipboardList,
  },
  {
    path: "/vendor-dashboard/get-product",
    name: "Get Product",
    icon: ShoppingBag,
  },
];

const Sidebar: React.FC = () => {
  const { sidebarOpen, closeSidebar } = useDashboard();

  return (
    <motion.aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-teal-800 to-teal-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out 
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      initial={false}
      animate={sidebarOpen ? "open" : "closed"}
    >
      <div className="flex flex-col h-full">
        {/* Logo and close button */}
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
          Vendor Portal &copy; {new Date().getFullYear()}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
