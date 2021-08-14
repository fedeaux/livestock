import Stock from 'models/stock';
import MainTitle from 'ui/typography/MainTitle';
import StockList from 'entities/Stocks/List';

async function apiStocksIndex() {
  return fetch('api/stocks.json').then((response) => {
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

  return (
    <View style={ tw('p-4') }>
      <MainTitle>
        Stocks
      </MainTitle>
      <StockList stocks={stocks} />
    </View>
  );
}
