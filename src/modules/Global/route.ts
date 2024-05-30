import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

import Anouncement from "./Pages/Anouncement";

export const anouncementRoute: RouteObject = {
  path: navPaths.OVERLOAD,
  children: [{ path: "", Component: Anouncement }],
};
