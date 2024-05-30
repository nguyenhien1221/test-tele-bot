import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import CreatePage from "./Pages/CreateAcount";

export const registerRoute: RouteObject = {
  path: navPaths.REGISTER,
  Component: CreatePage,
};
