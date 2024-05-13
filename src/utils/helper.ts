export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const isSameDay = (data: any) => {
  const now = new Date().getTime();
  const claimedDate =
    new Date(data[0]?.timestamp).getUTCFullYear() +
    "-" +
    (new Date(data[0]?.timestamp).getUTCMonth() + 1) +
    "-" +
    new Date(data[0]?.timestamp).getUTCDate();

  return new Date(now).getTime() > new Date(claimedDate).getTime() + 86400000;
};

export const checkSameDay = (data: any) => {
  if (!data.length || !data[0] || !data[0].timestamp) {
    return false;
  }

  const date = new Date();
  const d = new Date(data[0].timestamp);
  return (
    date.getUTCFullYear() === d.getUTCFullYear() &&
    date.getUTCMonth() === d.getUTCMonth() &&
    date.getUTCDate() === d.getUTCDate()
  );
};

export const getMobileOS = () => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) {
    return "Android";
  } else if (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "iOS";
  }
  return "Other";
};
