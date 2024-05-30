import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

import LeaderBoard from "./Pages/LeaderBoard";

export const leaderboardRoute: RouteObject = {
  path: navPaths.LEADERBOARD,
  children: [{ path: "", Component: LeaderBoard }],
};
