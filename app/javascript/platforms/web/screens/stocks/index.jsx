import Stock from "models/stock";
import MainTitle from "ui/typography/MainTitle";
import StockList from "entities/Stocks/List";
import { useApiStocks } from "generated/api";

export default function Stocks() {
  const { stocks, isLoading } = useApiStocks();

  if (isLoading) return null;

  return (
    <View style={tw("p-4")}>
      <MainTitle>Stocks</MainTitle>
      <StockList stocks={stocks} />
    </View>
  );
}
