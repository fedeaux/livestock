import TableCell from "ui/Table/Cell";
import TableHeader from "ui/Table/Header";
import TableRow from "ui/Table/Row";
import ColoredAmountAndRate from "ui/typography/ColoredAmountAndRate";
import formatMoneyAndPercentage from "ui/formatters/money_and_percentage";
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
const tableGrid = ["w-1/11", "w-3/11", "w-3/11", "w-3/11", "w-1/11"];
import Chart from "react-google-charts";

function WalletTableRow({ label, wallets, formatter, after = "" }) {
  return (
    <TableRow>
      <TableHeader twp={tableGrid[0]}> {label} </TableHeader>
      {wallets.map((wallet, index) => {
        return (
          <TableCell twp={tableGrid[index + 1]} key={wallet.id}>
            {formatter(wallet)}
          </TableCell>
        );
      })}
      <TableCell twp={["font-semibold", tableGrid[wallets.length + 1]]}>
        {after}
      </TableCell>
    </TableRow>
  );
}

function evalTotals(wallets) {
  const totals = {
    price: 0,
    marketPrice: 0,
    marketResult: 0,
    earnings: 0,
    payout: 0,
    marketResultRatio: 0,
    payoutRatio: 0,
  };

  wallets.forEach((wallet) => {
    totals.price += wallet.price;
    totals.marketPrice += wallet.marketPrice;
    totals.marketResult += wallet.marketResult;
    totals.earnings += wallet.earnings;
    totals.payout += wallet.payout;
  });

  totals.payoutRatio = totals.payout / totals.price;
  totals.marketResultRatio = totals.marketResult / totals.price;

  return totals;
}

function evalWalletUserStockChartDate(wallet) {
  const data = wallet.userStocks
    .sort((usa, usb) => {
      return usb.marketPrice - usa.marketPrice;
    })
    .map((userStock) => {
      return [
        `${userStock.code} ${formatPercentage(
          userStock.marketPrice / wallet.marketPrice
        )}`,
        userStock.marketPrice,
      ];
    });

  return {
    data: [["Stock", "Market Value"], ...data],
    options: {
      title: `${
        wallet.userStocks.filter((us) => {
          return us.stockCount > 0;
        }).length
      } assets`,
    },
  };
}

function WalletUserStockChart({ wallet }) {
  const props = useMemo(() => {
    return evalWalletUserStockChartDate(wallet);
  });

  return (
    <View style={tw(tableGrid[1])}>
      <Chart chartType="PieChart" width={"100%"} {...props} />
    </View>
  );
}

export default function WalletTable({ wallets }) {
  const totals = evalTotals(wallets);

  return (
    <View>
      <View>
        <TableRow>
          <TableHeader twp={tableGrid[0]} />
          {wallets.map((wallet, index) => {
            return (
              <TableHeader key={wallet.id} twp={tableGrid[index + 1]}>
                {wallet.name}
              </TableHeader>
            );
          })}
          <TableHeader twp={tableGrid[wallets.length + 1]}>Total</TableHeader>
        </TableRow>
        <WalletTableRow
          label="Price"
          formatter={(wallet) => {
            return formatMoneyAndPercentage(wallet.price, wallet.priceRatio);
          }}
          after={formatMoney(totals.price)}
          wallets={wallets}
        />
        <WalletTableRow
          label="Market Price"
          formatter={(wallet) => {
            return formatMoneyAndPercentage(
              wallet.marketPrice,
              wallet.marketPriceRatio
            );
          }}
          after={formatMoney(totals.marketPrice)}
          wallets={wallets}
        />
        <WalletTableRow
          label="Result"
          formatter={(wallet) => {
            return (
              <ColoredAmountAndRate
                amount={wallet.marketResult}
                rate={wallet.marketResultRatio}
              />
            );
          }}
          after={
            <ColoredAmountAndRate
              amount={totals.marketResult}
              rate={totals.marketResultRatio}
            />
          }
          wallets={wallets}
        />
        <WalletTableRow
          label="Earnings"
          formatter={(wallet) => {
            return formatMoneyAndPercentage(
              wallet.earnings,
              wallet.earningsRatio
            );
          }}
          after={formatMoney(totals.earnings)}
          wallets={wallets}
        />
        <WalletTableRow
          label="Payout"
          formatter={(wallet) => {
            return (
              <ColoredAmountAndRate
                amount={wallet.payout}
                rate={wallet.payoutRatio}
              />
            );
          }}
          after={
            <ColoredAmountAndRate
              amount={totals.payout}
              rate={totals.payoutRatio}
            />
          }
          wallets={wallets}
        />
      </View>
      <TableRow>
        <View style={tw(tableGrid[0])} />
        {wallets.map((wallet, index) => {
          return <WalletUserStockChart key={wallet.id} wallet={wallet} />;
        })}
      </TableRow>
    </View>
  );
}
