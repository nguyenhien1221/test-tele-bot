export const navPaths = {
  MISSIONS: "/missions",
  BOOTS: "/boots",
  FRIENDS: "/friends",
  GAMES: "/games",
  REGISTER: "/register",
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
    icon: "/images/navbar/missions.svg",
    name: "Missions",
    path: navPaths.MISSIONS,
  },
  {
    icon: "/images/navbar/boots.svg",
    name: "Boots",
    path: navPaths.BOOTS,
  },
  {
    icon: "/images/navbar/friends.svg",
    name: "Friends",
    path: navPaths.FRIENDS,
  },
  {
    icon: "/images/navbar/games.svg",
    name: "Games",
    path: navPaths.GAMES,
  },
];
