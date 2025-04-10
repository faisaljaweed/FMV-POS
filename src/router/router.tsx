import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../Login";
import Signup from "../Signup";
import AdminDashboard from "../Pages/Admin_Dashboard/Admin_Dashboard";
import Add_Vendor from "../Pages/Admin_Dashboard/Add_Vendor";
// import Home from "../Pages/Admin_Dashboard/Home";
import Homes from "../Pages/Vendor_Dashboard/Home";
import Get_Booking from "../Pages/Admin_Dashboard/Get_Booking";
import Get_Vendor from "../Pages/Admin_Dashboard/Get_Vendor";
import Get_Product from "../Pages/Admin_Dashboard/Get_Product";
import VendorDashboard from "../Pages/Vendor_Dashboard/Vendor_Dashboard";
import Add_Booking from "../Pages/Vendor_Dashboard/Add_Booking";
import Add_Product from "../Pages/Vendor_Dashboard/Add_Product";
import GetBooking from "../Pages/Vendor_Dashboard/Get_Booking";
import GetProduct from "../Pages/Vendor_Dashboard/Get_Product";
import Protected_Routes from "../Protected_route";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Protected_Routes role="admin" />}>
        <Route path="/admin_dashboard" element={<AdminDashboard />}>
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="add_vendor" element={<Add_Vendor />} />
          <Route path="get-booking" element={<Get_Booking />} />
          <Route path="get-product" element={<Get_Product />} />
          <Route path="get-vendor" element={<Get_Vendor />} />
        </Route>
      </Route>
      <Route element={<Protected_Routes role="vendor" />}>
        <Route path="/vendor-dashboard" element={<VendorDashboard />}>
          <Route path="add-booking" element={<Add_Booking />} />
          <Route path="add-product" element={<Add_Product />} />
          <Route path="get-booking" element={<GetBooking />} />
          <Route path="get-product" element={<GetProduct />} />
          <Route path="home" element={<Homes />} />
        </Route>
      </Route>
    </Route>
  )
);
