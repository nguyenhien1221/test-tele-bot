import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

const CreatePage = lazy(() => import("./Pages/CreateAcount"));

export const registerRoute: RouteObject = {
  path: navPaths.REGISTER,
  Component: CreatePage,
};
