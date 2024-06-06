import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

import Anouncement from "./Pages/Anouncement";
import Reload from "./Pages/Reload";

export const anouncementRoute: RouteObject = {
  path: "",
  children: [
    { path: navPaths.MAINTENANCE, Component: Anouncement },
    { path: navPaths.RELOAD, Component: Reload },
  ],
};
