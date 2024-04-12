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
    icon: "/images/navbar/missions.png",
    name: "Missions",
    path: navPaths.MISSIONS,
  },
  {
    icon: "/images/navbar/boots.png",
    name: "Boots",
    path: navPaths.BOOTS,
  },
  {
    icon: "/images/navbar/friends.png",
    name: "Friends",
    path: navPaths.FRIENDS,
  },
  {
    icon: "/images/navbar/games.png",
    name: "Games",
    path: navPaths.GAMES,
  },
];
