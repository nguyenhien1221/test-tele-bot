import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

import Dapp from "./Pages/Dapp";

export const dappRoute: RouteObject = {
  path: navPaths.DAPP,
  children: [{ path: "", Component: Dapp }],
};
