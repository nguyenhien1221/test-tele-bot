import { Navigate, Outlet, useLocation } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import useGetAcountDetails from "../Hooks/useRegister";
import { Suspense } from "react";
import Loading from "../common/Loading";
import { AxiosError } from "axios";
import { ResponseCode } from "../../constants/response";

const AuthLayout = () => {
  const location = useLocation();
  const tele = window.Telegram.WebApp;
  try {
    tele.setHeaderColor("#F7FFEB");
  } catch (err) {
    console.debug(err);
  }
  tele.expand();

  const overflow = 100;
  document.body.style.overflowY = "hidden";
  document.body.style.marginTop = `${overflow}px`;
  document.body.style.height = window.innerHeight + overflow + "px";
  document.body.style.paddingBottom = `${overflow}px`;
  window.scrollTo(0, overflow);

  const AcountData = useGetAcountDetails();

  const statusCode = (AcountData.error as AxiosError)?.response?.status

  if (AcountData.isLoading) return <Loading />;

  // navigate to reload page if has error
  if (
    (statusCode === ResponseCode.SERVER_ERR ||
      statusCode === ResponseCode.SERVER_UNKNOWN ||
      statusCode === ResponseCode.UNAUTHORIZED) &&
    location.pathname !== navPaths.RELOAD
  )
    return <Navigate to={navPaths.RELOAD} />;

  // navigate to maintenance when fix maintain server
  if (
    statusCode === ResponseCode.SERVER_MAINTAIN &&
    location.pathname !== navPaths.MAINTENANCE
  )
    return <Navigate to={navPaths.MAINTENANCE} />;

  // navigate to register page if dont have acount
  if (!AcountData.data &&
    location.pathname !== navPaths.REGISTER &&
    statusCode === ResponseCode.NOT_FOUND
  )
    return <Navigate to={navPaths.REGISTER} />;

  // navigate to home page if user has acount
  if (AcountData.data &&
    (location.pathname === navPaths.REGISTER ||
    location.pathname === navPaths.MAINTENANCE ||
    location.pathname === navPaths.RELOAD)
  )
    return <Navigate to="/" />;
  
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
