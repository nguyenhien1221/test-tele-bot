import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import { missionsRoute } from "../modules/Missions/route";
import HomeLayout from "../components/layouts/HomeLayout";
import { bootsRoute } from "../modules/Boots/route";
import { homeRoute } from "../modules/Home/route";

export const router = createBrowserRouter([
  {
    path: "",
    // Component: AuthLayout,
    children: [
      {
        path: "",
        Component: HomeLayout,
        children: [homeRoute, missionsRoute, bootsRoute],
      },
    ],
  },
  {
    path: "*",
    Component: undefined,
  },
]);
