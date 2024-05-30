import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";
import  BootsPage from "../Boots/Pages/Boots"

export const bootsRoute: RouteObject = {
  path: navPaths.BOOTS,
  children: [{ path: "", Component: BootsPage }],
};
