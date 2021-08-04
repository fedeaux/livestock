import Stock from 'models/stock';
import MainTitle from "ui/typography/MainTitle";
import StockList from 'entities/Stocks/List';

async function apiStocksIndex() {
  return fetch("api/stocks.json").then((response) => {
    return response.json();
  }).then((data) => {
    const instances = data.stocks.map((attributes) => {
      return new Stock(attributes);
    });

    return { ...data, stocks: instances };
  });
}

function useStocksIndex() {
  const [stocks, setStocks] = useState([]);

  useEffect(async () => {
    const response = await apiStocksIndex();
    setStocks(response.stocks);
  }, []);

  return { stocks };
}

export default function Stocks() {
  const { stocks } = useStocksIndex();
  console.log("stocks", stocks);

  return (
    <View style={ tw("p-4") }>
      <MainTitle>
        Stocks
      </MainTitle>
      <StockList stocks={stocks} />
    </View>
  );
}

// import SidePanel from 'ui/side_panel';
// import { withStocks } from 'generated/api/query_hooks';
// import { formatRelative } from "date-fns";

// function StockListItem({ stock, onClick=noop }) {
//   const handleOnClick = useCallback(() => {
//     onClick({ stock });
//   })

//   return (
//     <View style={ tw(["px-4 py-2 mb-2 rounded border border-gray-200", stock.backgroundColorClassName].join(" ")) } onClick={handleOnClick}>
//       <Text style={ tw("text-gray-600") }>{stock.code}</Text>
//       <Text style={ tw("text-gray-400") }>{formatRelative(stock.updatedAt, new Date)}</Text>
//     </View>
//   )
// }

// function StockList({ stocks, onStockListItemClick, ...other }) {
//   if(!stocks) {
//     return null;
//   }

//   return <View style={ tw("p-4") }>
//            {stocks.map((stock) => {
//              return <StockListItem
//                       key={stock.id}
//                       stock={stock}
//                       onClick={onStockListItemClick}
//                     />
//            })}
//          </View>;
// }

// function StockSidePanel({ stock }) {
//   return (
//     <SidePanel isVisible={stock}>
//       { stock && <Text> { stock.code } </Text> }
//     </SidePanel>
//   )
// }

// function InlineHoc({ component, ...props }) {
//   return (<>{component(props)}</>);
// }

// InlineHoc = withStocks(InlineHoc);
