import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

const FriendsPage = lazy(() => import("./Pages/Friends"));

export const friendsRoute: RouteObject = {
  path: navPaths.FRIENDS,
  children: [{ path: "", Component: FriendsPage }],
};
