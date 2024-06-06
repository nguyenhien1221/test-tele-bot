import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import MainBox from "./Pages/MainBox";
import UpgradeBox from "./Pages/UpgradeBox";

export const mysteryBoxRoute: RouteObject = {
  path: "",
  children: [
    { path: navPaths.MYSTERY_BOX, Component: MainBox },
    { path: navPaths.UPGRADE_BOX, Component: UpgradeBox },
  ],
};
