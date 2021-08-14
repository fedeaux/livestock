import TableCell from "ui/Table/Cell";
import TableHeader from "ui/Table/Header";
import TableRow from "ui/Table/Row";
import ColoredAmountAndRate from "ui/typography/ColoredAmountAndRate";
import formatMoneyAndPercentage from "ui/formatters/money_and_percentage";

const tableGrid = ["w-1/10", "w-3/10", "w-3/10", "w-3/10"];

function WalletTableRow({ label, wallets, formatter }) {
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
    </TableRow>
  );
}

export default function WalletTable({ wallets }) {
  return (
    <View>
      <TableRow>
        <TableHeader twp={tableGrid[0]} />
        {wallets.map((wallet, index) => {
          return (
            <TableHeader
              twp="w-3/12"
              key={wallet.id}
              twp={tableGrid[index + 1]}
            >
              {wallet.name}
            </TableHeader>
          );
        })}
      </TableRow>
      <WalletTableRow
        label="Price"
        formatter={(wallet) => {
          return formatMoneyAndPercentage(wallet.totalPrice, wallet.priceRatio);
        }}
        wallets={wallets}
      />
      <WalletTableRow
        label="Market Price"
        formatter={(wallet) => {
          return formatMoneyAndPercentage(
            wallet.totalMarketPrice,
            wallet.marketPriceRatio
          );
        }}
        wallets={wallets}
      />
      <WalletTableRow
        label="Earnings"
        formatter={(wallet) => {
          return formatMoneyAndPercentage(
            wallet.totalEarnings,
            wallet.earningsRatio
          );
        }}
        wallets={wallets}
      />
      <WalletTableRow
        label="Payout"
        formatter={(wallet) => {
          return (
            <ColoredAmountAndRate
              amount={wallet.currentPayout}
              rate={wallet.currentPayoutRate}
            />
          );
        }}
        wallets={wallets}
      />
    </View>
  );
}

// wallet.marketPriceRatio
// wallet.priceRatio
// wallet.currentPayout
// wallet.currentPayoutRatio
// wallet.totalEarnings
// wallet.totalMarketPrice
// wallet.totalPrice
