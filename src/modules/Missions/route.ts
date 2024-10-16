import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import MissionsPage from "./Pages/MissionsPage";

export const missionsRoute: RouteObject = {
  path: navPaths.MISSIONS,
  children: [{ path: "", Component: MissionsPage }],
};
