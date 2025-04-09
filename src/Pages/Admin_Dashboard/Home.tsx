import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import add from "../../Images/adjustments.0222d245.svg";
import get from "../../Images/products.dd840ce7.svg";

const Home = () => {
  return (
    <>
      <h2 className="text-2xl md:text-1xl font-bold mb-4 text-center">
        Admin Dashboard
      </h2>

      {/* Add Vendor */}
      <NavLink to="/admin_dashboard/add_vendor">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center justify-center h-16 w-16 md:h-28 md:w-28 rounded-md shadow-md mb-4 transition-colors ${
              isActive ? "bg-green-700" : "bg-gray-600"
            }`}
          >
            <AddIcon
              sx={{ color: "white", fontSize: { xs: 32, sm: 48, md: 50 } }}
            />
            <h2 className="text-xs text-center md:text-sm text-white font-bold">
              Add Vendor
            </h2>
          </div>
        )}
      </NavLink>

      {/* Get Vendor */}
      <NavLink to="/admin_dashboard/get-vendor">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center justify-center h-16 w-16 md:h-28 md:w-28 rounded-md shadow-md mb-4 transition-colors ${
              isActive ? "bg-green-700" : "bg-gray-600"
            }`}
          >
            <img src={add} className="w-8 h-8 md:w-12 md:h-12" />
            <h2 className="text-xs text-center md:text-sm text-white font-bold">
              Get
              <br /> Vendor
            </h2>
          </div>
        )}
      </NavLink>

      {/* Get Product */}
      <NavLink to="/admin_dashboard/get-product">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center justify-center h-16 w-16 md:h-28 md:w-28 rounded-md shadow-md mb-4 transition-colors ${
              isActive ? "bg-green-700" : "bg-gray-600"
            }`}
          >
            <img src={get} className="w-8 h-8 md:w-12 md:h-12" />
            <h2 className="text-xs text-center md:text-sm text-white font-bold">
              Get Product
            </h2>
          </div>
        )}
      </NavLink>

      {/* Get Booking */}
      <NavLink to="/admin_dashboard/get-booking">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center justify-center h-16 w-16 md:h-28 md:w-28 rounded-md shadow-md mb-4 transition-colors ${
              isActive ? "bg-green-700" : "bg-gray-600"
            }`}
          >
            <img src={get} className="w-8 h-8 md:w-12 md:h-12" />
            <h2 className="text-xs text-center md:text-sm text-white font-bold">
              Get Booking
            </h2>
          </div>
        )}
      </NavLink>
    </>
  );
};

export default Home;
