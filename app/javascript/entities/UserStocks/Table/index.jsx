import TableRow from "ui/Table/Row";
import UserStockTableRow from "entities/UserStocks/Table/Row";
import UserStockTableHeader from "entities/UserStocks/Table/Header";
import tableGrid from "entities/UserStocks/Table/grid";

function processUserStocks(userStocks, options) {
  const processedUserStocks = userStocks
    .filter((userStock) => {
      return !options.showActiveOnly || userStock.isActive;
    })
    .sort((usa, usb) => {
      const sortValueA = usa[options.sortBy];
      const sortValueB = usb[options.sortBy];

      if (typeof sortValueA === "string") {
        return sortValueA.localeCompare(sortValueB);
      } else {
        return sortValueB - sortValueA;
      }
    });

  return processedUserStocks;
}

export default function UserStockTable({ userStocks }) {
  const [processedUserStocks, setProcessedUserStocks] = useState([]);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [sortBy, setSortBy] = useState("code");

  useEffect(() => {
    const processedUserStocks = processUserStocks(userStocks, {
      showActiveOnly,
      sortBy,
    });
    setProcessedUserStocks(processedUserStocks);
  }, [userStocks, sortBy]);

  return (
    <View>
      <TableRow>
        <UserStockTableHeader
          position={0}
          label="Code"
          sortKey="code"
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        <UserStockTableHeader position={1} label="Count" />
        <UserStockTableHeader position={2} label="Price" />
        <UserStockTableHeader position={3} label="Market Price" />
        <UserStockTableHeader
          position={4}
          label="Result"
          sortKey="marketResult"
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        <UserStockTableHeader
          position={5}
          label="Earnings"
          sortKey="arnings"
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        <UserStockTableHeader
          position={6}
          label="Payout"
          sortKey="payout"
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        <UserStockTableHeader
          position={7}
          label="Wallet"
          sortKey="walletName"
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        <UserStockTableHeader
          position={8}
          label="%"
          sortKey="walletRatio"
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      </TableRow>

      {processedUserStocks.map((userStock) => {
        return <UserStockTableRow key={userStock.id} userStock={userStock} />;
      })}
    </View>
  );
}
