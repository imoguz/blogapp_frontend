import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
const PrivateRouter = () => {
  const { userData } = useAuthContext();
  return userData.tokenData?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRouter;
