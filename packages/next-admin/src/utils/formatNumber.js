export function formatMoney(number) {
  if (!number) return 0;
  return new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
  }).format(number);
}
