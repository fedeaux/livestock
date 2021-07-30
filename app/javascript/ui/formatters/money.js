export default function formatMoney(amount, options = { currency: "R$" }) {
  return `${options.currency} ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
