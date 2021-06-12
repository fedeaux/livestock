import Stock from 'models/stock'
import SidePanel from 'ui/side_panel'
import { withStocks } from 'generated/api/query_hooks'

function StockListItem({ stock, onClick=noop }) {
  const handleOnClick = useCallback(() => {
    onClick({ stock });
  })

  return (
    <View style={ tw("px-4 py-2 mb-2 rounded border border-gray-200") } onClick={handleOnClick}>
      <Text style={ tw("text-gray-600") } key={stock.id}>{stock.code}</Text>
    </View>
  )
}

function StockList({ stocks, onListItemClick, ...other }) {
  if(!stocks) {
    return null;
  }

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

export default function StocksScreen() {
  const [selectedStock, setSelectedStock] = useState();
  const onStockListItemClick = useCallback(({ stock }) => {
    setSelectedStock(selectedStock?.id === stock.id ? null : stock);
  })

  return (
    <View>
      <StockSidePanel stock={selectedStock}/>
      {withStocks(StockList)({ onListItemClick: onStockListItemClick })}
    </View>
  )
}
