import Stock from 'models/stock';
import SidePanel from 'ui/side_panel';
import { withUserStocks, withUserStockEarnings } from 'generated/api/query_hooks';
import { formatRelative } from 'date-fns';

function UserStockEarningList({ userStockDividends }) {
  console.log('userStockDividends', userStockDividends);

  return null;
}

const WithUserStockEarnings = withUserStockEarnings(UserStockEarningList);

function UserStockListItem({ userStock, onClick=noop }) {
  const handleOnClick = useCallback(() => {
    onClick({ userStock });
  });

  return (
    <View style={ tw(['px-4 py-2 mb-2 rounded border border-gray-200', userStock.backgroundColorClassName].join(' ')) } onClick={handleOnClick}>
      <Text style={ tw('text-gray-600') }>{userStock.code}</Text>
      <Text style={ tw('text-gray-400') }>{formatRelative(userStock.updatedAt, new Date)}</Text>
    </View>
  );
}

function UserStockList({ userStocks, onUserStockListItemClick, ...other }) {
  if(!userStocks) {
    return null;
  }

  useEffect(() => {
    if(userStocks) {
      onUserStockListItemClick({ userStock: userStocks[0] });
    }
  }, [userStocks]);

  return <View style={ tw('p-4') }>
    {userStocks.map((userStock) => {
      return <UserStockListItem
        key={userStock.id}
        userStock={userStock}
        onClick={onUserStockListItemClick}
      />;
    })}
  </View>;
}

function UserStockSidePanel({ userStock }) {
  return (
    <SidePanel isVisible={userStock}>
      { userStock && <Text> { userStock.code } </Text> }
      <WithUserStockEarnings />
    </SidePanel>
  );
}

function InlineHoc({ component, ...props }) {
  return (<>{component(props)}</>);
}

const WithUserStocks = withUserStocks(UserStockList);

export default function UserStocksScreen() {
  const [selectedUserStock, setSelectedUserStock] = useState();
  const onUserStockListItemClick = useCallback(({ userStock }) => {
    setSelectedUserStock(selectedUserStock?.id === userStock.id ? null : userStock);
  });

  return (
    <View>
      <UserStockSidePanel userStock={selectedUserStock} />
      <WithUserStocks onUserStockListItemClick={onUserStockListItemClick} />
    </View>
  );
}
