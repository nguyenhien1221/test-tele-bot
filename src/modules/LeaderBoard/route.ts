import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

const LeaderBoard = lazy(() => import("./Pages/LeaderBoard"));

export const leaderboardRoute: RouteObject = {
  path: navPaths.LEADERBOARD,
  children: [{ path: "", Component: LeaderBoard }],
};
