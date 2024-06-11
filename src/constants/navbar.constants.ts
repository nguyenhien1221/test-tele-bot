export const navPaths = {
  MISSIONS: "/missions",
  BOOTS: "/boots",
  FRIENDS: "/friends",
  GAMES: "/games",
  REGISTER: "/register",
  LEADERBOARD: "/leaderboard",
  MAINTENANCE: "/maintenance",
  RELOAD: "/reload",
  VOTING: "/voting",
  TUT: "/tutorial",
  DAPP: "/dapp",
  MYSTERY_BOX: "/mystery-box",
  UPGRADE_BOX: "/upgrade-box",
  OPEN_BOX: "/open-box",
};

export interface NavBarItem {
  icon?: string;
  name: string;
  path: string;
  fatherName?: string;
  items?: NavBarItem[];
}

export const navbarItems: NavBarItem[] = [
  {
    icon: "/images/navbar/missions.png",
    name: "Missions",
    path: navPaths.MISSIONS,
  },
  {
    icon: "/images/navbar/boots.png",
    name: "Boost",
    path: navPaths.BOOTS,
  },
  {
    icon: "/images/navbar/friends.png",
    name: "Friends",
    path: navPaths.FRIENDS,
  },
  {
    icon: "/images/navbar/games.png",
    name: "DApps",
    path: navPaths.DAPP,
  },
  // {
  //   icon: "/images/navbar/voting-game.png",
  //   name: "Games",
  //   path: navPaths.VOTING,
  // },
];
