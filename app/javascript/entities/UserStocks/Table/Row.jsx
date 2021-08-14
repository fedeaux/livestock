import ColoredAmountAndRate from "ui/typography/ColoredAmountAndRate";
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import tableGrid from "entities/UserStocks/Table/grid";
import { Link } from "react-router-dom";
import TableCell from "ui/Table/Cell";

function UserStockTableCellResults({ userStock }) {
  return (
    <ColoredAmountAndRate
      amount={userStock.marketResult}
      rate={userStock.marketResultRatio}
      className={["text-center", tableGrid[4]].join(" ")}
    />
  );
}

function UserStockTableCellEarnings({ userStock }) {
  let value = userStock.earnings;

  if (value == 0) {
    value = "-";
  } else {
    value = formatMoney(userStock.earnings);
  }

  return (
    <Text style={tw("text-gray-600 text-center", tableGrid[5])}>{value}</Text>
  );
}

function UserStockTableCellPayout({ userStock }) {
  return (
    <ColoredAmountAndRate
      amount={userStock.payout}
      rate={userStock.payoutRatio}
      className={["text-center", tableGrid[6]].join(" ")}
    />
  );
}

export default function UserStockTableRow({ userStock }) {
  return (
    <View style={tw("px-4 py-2 flex flex-row border-b border-gray-200")}>
      <Link
        style={tw("text-center no-underline", tableGrid[0])}
        to={userStock.clientPath}
      >
        <Text style={tw("text-gray-600 font-semibold")}>{userStock.code}</Text>
      </Link>
      <TableCell twp={tableGrid[1]}>{userStock.stockCount}</TableCell>
      <TableCell twp={tableGrid[2]}>{formatMoney(userStock.price)}</TableCell>
      <TableCell twp={tableGrid[3]}>
        {formatMoney(userStock.marketPrice)}
      </TableCell>
      <UserStockTableCellResults userStock={userStock} />
      <UserStockTableCellEarnings userStock={userStock} />
      <UserStockTableCellPayout userStock={userStock} />
      <TableCell twp={tableGrid[7]}>{userStock.walletName}</TableCell>
      <TableCell twp={tableGrid[8]}>
        {formatPercentage(userStock.walletRatio)}
      </TableCell>
    </View>
  );
}
