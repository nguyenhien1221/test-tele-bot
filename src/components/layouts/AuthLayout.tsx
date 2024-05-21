import { Navigate, Outlet, useLocation } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import useGetAcountDetails from "../Hooks/useRegister";
import { Suspense } from "react";
import Loading from "../common/Loading";

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
  // console.log(AcountData.error);

  if (AcountData.isLoading) return <Loading />;
  // if (
  //   AcountData?.error &&
  //   AcountData?.error?.code === "ERR_NETWORK" &&
  //   location.pathname !== navPaths.OVERLOAD
  // )
  //   return <Navigate to={navPaths.OVERLOAD} />;
  // navigate to register page if user doesn't have acount
  if (!AcountData.data && location.pathname !== navPaths.REGISTER)
    return <Navigate to={navPaths.REGISTER} />;
  // navigate to home page if user has acount
  if (AcountData.data && location.pathname === navPaths.REGISTER)
    return <Navigate to="/" />;

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
