export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const isSameDay = (data: any) => {
  const date = new Date();
  const now =
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date.getUTCDate();
  const claimedDate =
    new Date(data[0]?.timestamp).getUTCFullYear() +
    "-" +
    (new Date(data[0]?.timestamp).getUTCMonth() + 1) +
    "-" +
    new Date(data[0]?.timestamp).getUTCDate();

  return new Date(now).getTime() > new Date(claimedDate).getTime() + 86400000;
};

export const checkSameDay = (data: any) => {
  const date = new Date();
  const now =
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date.getUTCDate();
  const claimedDate =
    new Date(data[0]?.timestamp).getUTCFullYear() +
    "-" +
    (new Date(data[0]?.timestamp).getUTCMonth() + 1) +
    "-" +
    new Date(data[0]?.timestamp).getUTCDate();
  return new Date(now).getTime() === new Date(claimedDate).getTime();
};
