import { Navigate, Outlet } from "react-router-dom";
const Protected_Routes = ({ role }: { role: string }) => {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Protected_Routes;
