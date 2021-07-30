import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";

export default function ColoredAmountAndRate({ amount, rate, className="" }) {
  const color = amount < 0 ? "text-red-600" : "text-green-600";

  return (
    <Text style={ tw(className, color) }>
      {formatMoney(amount)} ({formatPercentage(rate)})
    </Text>
  );
}
