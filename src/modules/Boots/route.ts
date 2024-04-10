import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

const BootsPage = lazy(() => import("./Pages/Boots"));

export const bootsRoute: RouteObject = {
  path: navPaths.BOOTS,
  children: [{ path: "", Component: BootsPage }],
};
