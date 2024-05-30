import { RouteObject } from "react-router-dom";
import HomePage from "./Home";

export const homeRoute: RouteObject = {
  path: "/",
  children: [{ path: "", Component: HomePage }],
};
