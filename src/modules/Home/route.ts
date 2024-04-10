import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("./Home"));

export const homeRoute: RouteObject = {
  path: "/",
  children: [{ path: "", Component: HomePage }],
};
