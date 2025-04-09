import Home from "./Home";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-screen">
        <div className="w-full md:w-[20%] lg:w-[15%] bg-gray-800 text-white p-4 flex flex-col items-center m:h-full ">
          <Home />
        </div>
        <main className="w-full md:w-[80%] lg:w-[85%] p-4 overflow-auto bg-[#f1f5f9]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
