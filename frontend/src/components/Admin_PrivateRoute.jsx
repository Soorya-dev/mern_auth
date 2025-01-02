import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

function Admin_PrivateRoute() {
  const { adminDetals } = useSelector((state) => state.admin);

  return adminDetals ? <Outlet /> : <Navigate to={'/admin-sign-in'} />;
}

export default Admin_PrivateRoute;
