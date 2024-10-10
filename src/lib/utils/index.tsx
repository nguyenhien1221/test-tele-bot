export function formatNumber(number: number): string {
  let [integerPart, decimalPart] = number.toString().split('.');

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!decimalPart) {
    decimalPart = '00';
  } else if (decimalPart.length === 1) {
    decimalPart += '0';
  }

  return `${integerPart}.${decimalPart}`;
}
