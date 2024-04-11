import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

const AuthLayout = () => {
  const firstLogin = Math.floor(Math.random() * 10);

  if (firstLogin < 5) return <Navigate to={navPaths.REGISTER} />;
  return <Outlet />;
};

export default AuthLayout;
