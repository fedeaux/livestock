import { Link } from 'react-router-dom';
import formatMoney from "ui/formatters/money";
import tableGrid from "entities/Stocks/List/tableGrid";

export default function StockListItem({ stock }) {
  return (
    <View style={ tw("px-4 py-2 flex flex-row border-b border-gray-200") }>
      <Link style={ tw("text-center no-underline", tableGrid[0]) } to={stock.clientPath}>
        <Text style={ tw("text-gray-600 font-semibold") } >
          {stock.code}
        </Text>
      </Link>
      <Text style={ tw("text-gray-600 text-left", tableGrid[1]) }>{stock.name}</Text>
      <Text style={ tw("text-gray-600 text-center", tableGrid[2]) }>{stock.category}</Text>
    </View>
  );
}
