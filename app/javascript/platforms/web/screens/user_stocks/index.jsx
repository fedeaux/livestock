import Stock from 'models/stock'
import SidePanel from 'ui/side_panel'
import { withUserStocks } from 'generated/api/query_hooks'
import { formatRelative } from "date-fns"

function UserStockListItem({ user_stock, onClick=noop }) {
  const handleOnClick = useCallback(() => {
    onClick({ stock });
  })

  return (
    <View style={ tw(["px-4 py-2 mb-2 rounded border border-gray-200", stock.backgroundColorClassName].join(" ")) } onClick={handleOnClick}>
      <Text style={ tw("text-gray-600") }>{stock.code}</Text>
      <Text style={ tw("text-gray-400") }>{formatRelative(stock.updatedAt, new Date)}</Text>
    </View>
  )
}

function UserStockList({ userStocks, onListItemClick, ...other }) {
  if(!userStocks) {
    return null;
  }

  console.log(userStocks[0]);

  return null;
}

function UserStockSidePanel({ stock }) {
  return (
    <SidePanel isVisible={stock}>
      { stock && <Text> { stock.code } </Text> }
    </SidePanel>
  )
}

function InlineHoc({ component, ...props }) {
  return (<>{component(props)}</>);
}

InlineHoc = withUserStocks(InlineHoc);

export default function UserStocksScreen() {
  const [selectedUserStock, setSelectedUserStock] = useState();
  const onUserStockListItemClick = useCallback(({ stock }) => {
    setSelectedUserStock(selectedUserStock?.id === stock.id ? null : stock);
  })

  return (
    <View>
      <UserStockSidePanel stock={selectedUserStock} />
      <InlineHoc component={UserStockList} onUserStockListItemClick={onUserStockListItemClick} />
    </View>
  )
}
