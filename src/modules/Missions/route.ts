import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

const MissionsPage = lazy(() => import("./Pages/MissionsPage"));

export const missionsRoute: RouteObject = {
  path: navPaths.MISSIONS,
  children: [{ path: "", Component: MissionsPage }],
};
