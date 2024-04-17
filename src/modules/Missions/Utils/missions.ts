import { missionsTypes } from "../../../constants/missions.constants";

export const getMissionsByType = (type: number, data: any) => {
  let missionsType = missionsTypes.TWITTER_FOLLOW;
  if (type === 1) {
    missionsType = missionsTypes.TELEGRAM__JOIN;
  } else if (type === 2) {
    missionsType = missionsTypes.REFER;
  }

  const Missions = data?.filter((item: any) => item.type === missionsType);

  return Missions;
};

export const getToltalReward = (type: number, data: any) => {
  const total = getMissionsByType(type, data)?.reduce(
    (total: number, mission: any) => total + mission.reward_amount,
    0
  );

  return total;
};
