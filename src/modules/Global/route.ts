import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

const Anouncement = lazy(() => import("./Pages/Anouncement"));

export const anouncementRoute: RouteObject = {
  path: navPaths.OVERLOAD,
  children: [{ path: "", Component: Anouncement }],
};
