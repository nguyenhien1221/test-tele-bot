export const getMissionsByType = (type: string, data: any) => {
  if (data.length > 0) {
    const Missions = data?.filter((item: any) => item.type === type);
    return Missions;
  }
};

export const removeDuplicateItemsByType = (items: any[]): any[] => {
  const uniqueItemsMap = new Map<string, any>();

  items.forEach((item) => {
    uniqueItemsMap.set(item.type, item);
  });

  return Array.from(uniqueItemsMap.values());
};
