export const formatNumberFloatFix = (value: number | string, fix: number) => {
  if (!value) return "0";
  return Number(value)
    .toFixed(fix)
    .replace(/[.,]0$|[.,]00$|[.,]000$|[.,]0000$|0$|00$|000$|0000$/, "");
};
