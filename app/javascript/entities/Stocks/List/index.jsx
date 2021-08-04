import StockListItem from "entities/Stocks/List/Item";
import TableHeader from "ui/Table/Header";
import TableRow from "ui/Table/Row";

export default function StockList({ stocks }) {
  return (
    <View>
      <TableRow>
        <TableHeader position={0} label="Code" sortKey="code" />
      </TableRow>

      {
        stocks.map((stock) => {
          return <StockListItem key={stock.id} stock={stock} />;
        })
      }
    </View>
  );
}
