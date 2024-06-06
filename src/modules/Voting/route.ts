import { RouteObject } from "react-router-dom";
import { navPaths } from "../../constants/navbar.constants";

import VotingPage from "./Pages/Voting";
import TutPage from "./Pages/Tutorial";

export const tutRoute: RouteObject = {
  path: navPaths.TUT,
  children: [{ path: "", Component: TutPage }],
};

export const votingRoute: RouteObject = {
  path: navPaths.VOTING,
  children: [{ path: "", Component: VotingPage }],
};
