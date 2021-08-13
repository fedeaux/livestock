import formatMoney from "ui/formatters/money";
import TableRow from "ui/Table/Row";
import TableCell from "ui/Table/Cell";
import { format } from "date-fns";

export default function UserStockEarningListItem({ userStockEarning }) {
  return (
    <TableRow>
      <TableCell twp="w-20">{userStockEarning.code}</TableCell>
      <TableCell twp="w-20">{userStockEarning.stockCount}</TableCell>
      <TableCell twp="w-20">{format(userStockEarning.receivedAt, "MMM/yy")}</TableCell>
      <TableCell twp="w-20">{formatMoney(userStockEarning.total)}</TableCell>
    </TableRow>
  );
}
