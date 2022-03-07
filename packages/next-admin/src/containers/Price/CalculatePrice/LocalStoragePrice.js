const PRICE_KEY = '__prices__';

export const getPriceData = () => {
  return JSON.parse(localStorage.getItem(PRICE_KEY));
};

export function savePriceData(data) {
  localStorage.setItem(PRICE_KEY, JSON.stringify(data));
}

export function removePriceData() {
  localStorage.removeItem(PRICE_KEY);
}
