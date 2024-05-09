import { createBrowserRouter } from "react-router-dom";
import { missionsRoute } from "../modules/Missions/route";
import HomeLayout from "../components/layouts/HomeLayout";
import { bootsRoute } from "../modules/Boots/route";
import { homeRoute } from "../modules/Home/route";
import { friendsRoute } from "../modules/Friends/route";
import AuthLayout from "../components/layouts/AuthLayout";
import { registerRoute } from "../modules/Register/route";
import { leaderboardRoute } from "../modules/LeaderBoard/route";

export const router = createBrowserRouter([
  {
    path: "",
    Component: AuthLayout,
    children: [
      registerRoute,
      {
        path: "",
        Component: HomeLayout,
        children: [
          homeRoute,
          missionsRoute,
          bootsRoute,
          friendsRoute,
          leaderboardRoute,
        ],
      },
    ],
  },
  {
    path: "*",
    Component: undefined,
  },
]);
