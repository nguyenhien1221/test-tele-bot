import { Navigate, Outlet, useLocation } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import useGetAcountDetails from "../Hooks/useRegister";
import { Suspense } from "react";
import Loading from "../common/Loading";
import { log } from "console";

const AuthLayout = () => {
  const location = useLocation();
  const tele = window.Telegram.WebApp;
  tele.setHeaderColor("#FFF5CF");

  const AcountData = useGetAcountDetails();

  if (AcountData.isError && location.pathname !== navPaths.REGISTER)
    return <Navigate to={navPaths.REGISTER} />;
  if (AcountData.isSuccess && location.pathname === navPaths.REGISTER)
    return <Navigate to="/" />;

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
