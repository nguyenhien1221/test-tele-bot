export const missionsTypes = {
  SIGN_IN: "sign-in",
  TWITTER_FOLLOW: "twitter-follow",
  TELEGRAM__JOIN: "telegram-join",
  DAILY: "daily",
};

export const missionsOptions = [
  {
    icon: "/images/icons/daily.png",
    title: "Invite a friend",
    description: "Daily",
    seed: 0.05,
    type: missionsTypes.DAILY,
  },
  {
    icon: "/images/icons/twitter.png",
    title: "Follow on Twitter",
    description: "Twitter",
    seed: 0.02,
    type: missionsTypes.TWITTER_FOLLOW,
  },
  {
    icon: "/images/icons/telegram.png",
    title: "Telegram",
    description: "Telegram",
    seed: 0.02,
    type: missionsTypes.TELEGRAM__JOIN,
  },
];

export const socials: { [key: string]: string } = {
  [missionsTypes.TWITTER_FOLLOW]: "Twitter",
  [missionsTypes.TELEGRAM__JOIN]: "Telegram",
  Discord: "Discord",
};

export const dailyBonusValue = [
  10000000, 20000000, 70000000, 30000000, 20000000, 50000000, 100000000,
];
