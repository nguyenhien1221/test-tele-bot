export const formatNumberFloatFix = (value: number | string, fix: number) => {
  if (!value) return "0";
  return Number(value).toFixed(fix);
  // .replace(/[.,]0$|[.,]00$|[.,]000$|[.,]0000$|0$|00$|000$|0000$/, "");
};

export const formatDecimals = (value: number | string) => {
  const result = Number(value) / Math.pow(10, 9);
  return result;
};

export const getNumberFormatUs = (
  number: number | string | undefined | null,
  fix?: number
) => {
  if (typeof number !== "number" && typeof number !== "string") return "0";
  const numberTypeNumb = typeof number === "string" ? Number(number) : number;
  const numberFormatFloat = formatNumberFloatFix(numberTypeNumb, fix ? fix : 2);
  return Number(numberFormatFloat)?.toLocaleString("en-US", {
    maximumFractionDigits: fix ? fix : 2,
  });
};

export const convertNumber = (number: number) => {
  const thresholds = [100, 500, 1000, 5000, 10000, 100000];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (number >= thresholds[i]) {
      return thresholds[i] + "+";
    }
  }
  return number.toString();
};
