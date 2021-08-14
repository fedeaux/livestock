import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";

export default function formatMoneyAndPercentage(amount, percentage) {
  return (
    formatMoney(amount) +
      " (" +
      formatPercentage(percentage) +
      ")"
  );
}
