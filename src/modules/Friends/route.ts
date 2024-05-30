import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

import FriendsPage from "./Pages/Friends";

export const friendsRoute: RouteObject = {
  path: navPaths.FRIENDS,
  children: [{ path: "", Component: FriendsPage }],
};
