import Stock from 'models/stock'
import SidePanel from 'ui/side_panel'
import { withStocks } from 'generated/api/query_hooks'
import { formatRelative } from "date-fns"

function StockListItem({ stock, onClick=noop }) {
  const handleOnClick = useCallback(() => {
    console.log(stock);
    console.log(stock.isLowRisk);
    onClick({ stock });
  })

  return (
    <View style={ tw(["px-4 py-2 mb-2 rounded border border-gray-200", stock.backgroundColorClassName].join(" ")) } onClick={handleOnClick}>
      <Text style={ tw("text-gray-600") }>{stock.code}</Text>
      <Text style={ tw("text-gray-400") }>{formatRelative(stock.updatedAt, new Date)}</Text>
    </View>
  )
}

function StockList({ stocks, onListItemClick, ...other }) {
  if(!stocks) {
    return null;
  }

  console.log(stocks[0]);

  return <View style={ tw("p-4") }>
           {stocks.map((stock) => {
             return <StockListItem
                      key={stock.id}
                      stock={stock}
                      onClick={onListItemClick}
                    />
           })}
         </View>;
}

function StockSidePanel({ stock }) {
  return (
    <SidePanel isVisible={stock}>
      { stock && <Text> { stock.code } </Text> }
    </SidePanel>
  )
}

function InlineHoc({ component, ...props }) {
  return (<>{component(props)}</>);
}

InlineHoc = withStocks(InlineHoc);

export default function StocksScreen() {
  const [selectedStock, setSelectedStock] = useState();
  const onStockListItemClick = useCallback(({ stock }) => {
    setSelectedStock(selectedStock?.id === stock.id ? null : stock);
  })

  return (
    <View>
      <StockSidePanel stock={selectedStock} />
      <InlineHoc component={StockList} onStockListItemClick={onStockListItemClick} />
    </View>
  )
}
