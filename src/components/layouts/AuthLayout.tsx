import { Navigate, Outlet, useLocation } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import useGetAcountDetails from "../Hooks/useRegister";
import { Suspense } from "react";
import Loading from "../common/Loading";

const AuthLayout = () => {
  const location = useLocation();
  const tele = window.Telegram.WebApp;
  tele.setHeaderColor("#F7FFEB");
  tele.expand();

  const AcountData = useGetAcountDetails();

  if (AcountData.isLoading) return <Loading />;
  if (!AcountData.data && location.pathname !== navPaths.REGISTER)
    return <Navigate to={navPaths.REGISTER} />;
  if (AcountData.data && location.pathname === navPaths.REGISTER)
    return <Navigate to="/" />;

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
