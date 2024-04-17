import { Navigate, Outlet, useLocation } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import useGetAcountDetails from "../Hooks/useRegister";
import { Suspense } from "react";
import Loading from "../common/Loading";

const AuthLayout = () => {
  const location = useLocation();
  const tele = window.Telegram.WebApp;
  tele.setHeaderColor("#FFF5CF");

  const AcountData = useGetAcountDetails();

  console.log(
    AcountData.data?.status === undefined &&
      location.pathname !== navPaths.REGISTER
  );

  if (
    AcountData.data?.status === undefined &&
    location.pathname !== navPaths.REGISTER &&
    !AcountData.isLoading
  ) {
    return <Navigate to={navPaths.REGISTER} />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
