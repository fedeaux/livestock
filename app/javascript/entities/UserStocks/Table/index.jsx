import TableRow from "ui/Table/Row";
import UserStockTableRow from "entities/UserStocks/Table/Row";
import UserStockTableHeader from "entities/UserStocks/Table/Header";
import tableGrid from "entities/UserStocks/Table/grid";

function processUserStocks(userStocks, options) {
  const processedUserStocks = userStocks.filter((userStock) => {
    return (!options.showActiveOnly || userStock.isActive);
  }).sort((usa, usb) => {
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
    const processedUserStocks = processUserStocks(userStocks, { showActiveOnly, sortBy });
    setProcessedUserStocks(processedUserStocks);
  }, [userStocks, sortBy]);

  return (
    <View>
      <TableRow>
        <UserStockTableHeader position={0} label="Code" sortKey="code" setSortBy={setSortBy} sortBy={sortBy} />
        <UserStockTableHeader position={1} label="Count" />
        <UserStockTableHeader position={2} label="Price" />
        <UserStockTableHeader position={3} label="Market Price" />
        <UserStockTableHeader position={4} label="Earnings" sortKey="totalEarnings" setSortBy={setSortBy} sortBy={sortBy} />
        <UserStockTableHeader position={5} label="Payout" sortKey="currentPayout" setSortBy={setSortBy} sortBy={sortBy} />
        <UserStockTableHeader position={6} label="%" sortKey="walletRatio" setSortBy={setSortBy} sortBy={sortBy} />
        <UserStockTableHeader position={7} label="Category" sortKey="category" setSortBy={setSortBy} sortBy={sortBy} />
      </TableRow>

      {
        processedUserStocks.map((userStock) => {
          return <UserStockTableRow key={userStock.id} userStock={userStock} />;
        })
      }
    </View>
  );
}

// {
//   results ?
//     <TableRow>
//       <Text style={ tw("text-gray-400 text-lg font-bold text-center", tableGrid[0]) } >TOTAL</Text>
//       <Text style={ tw(tableGrid[1]) } />
//       <Text style={ tw("text-gray-600 text-lg text-center", tableGrid[2]) }>{ formatMoney(results.totalPrice) }</Text>
//       <Text style={ tw("text-gray-600 text-lg text-center", tableGrid[3]) }>{ formatMoney(results.totalMarketPrice) }</Text>
//       <Text style={ tw("text-gray-600 text-lg text-center", tableGrid[4]) }>{ formatMoney(results.totalEarnings) }</Text>
//       <ColoredAmountAndRate
//         amount={results.totalPayout}
//         rate={results.totalPayoutRate}
//         className={["w-60 text-lg text-center", tableGrid[5]].join(" ")}
//       />
//       <Text style={ tw("text-gray-400 text-lg font-bold text-center", tableGrid[6]) } />
//       <Text style={ tw("text-gray-400 text-lg font-bold text-center", tableGrid[7]) } />
//     </TableRow> : null
// }

// {
//   processedUserStocks ? (
//     <View>
//       <MainTitle> Wallet </MainTitle>
//       <UserStockWallet userStocks={processedUserStocks} />
//     </View>
//   ) : null
// }
