// wallet.marketPriceRatio
// wallet.priceRatio
// wallet.currentPayout
// wallet.currentPayoutRatio
// wallet.totalEarnings
// wallet.totalMarketPrice
// wallet.totalPrice

function WalletCardRow({ label, children }) {
  return (
    <View>
      <Text style={tw("text-gray-600")}>{label}</Text>
      {children}
    </View>
  );
}

function Card({ title, children }) {
  return (
    <View style={tw("flex-grow mx-2 p-2 px-4 border border-gray-200 rounded")}>
      <Text style={tw("text-lg text-gray-400")}>{title}</Text>
      <View style={tw("mt-2")}>{children}</View>
    </View>
  );
}

function WalletCard({ wallet }) {
  return (
    <Card title={wallet.name}>
      <WalletCardRow label="Market Price Ratio">
        {wallet.marketPriceRatio}
      </WalletCardRow>
      <WalletCardRow label="Price Ratio">{wallet.priceRatio}</WalletCardRow>
      <WalletCardRow label="Current Payout">
        {wallet.currentPayout}
      </WalletCardRow>
      <WalletCardRow label="Current Payout Ratio">
        {wallet.currentPayoutRatio}
      </WalletCardRow>
      <WalletCardRow label="Total Earnings">
        {wallet.totalEarnings}
      </WalletCardRow>
      <WalletCardRow label="Total Market Price">
        {wallet.totalMarketPrice}
      </WalletCardRow>
      <WalletCardRow label="Total Price">{wallet.totalPrice}</WalletCardRow>
    </Card>
  );
}

export default function WalletCards({ wallets }) {
  return (
    <View style={tw("flex-row")}>
      {wallets.map((wallet) => {
        return <WalletCard key={wallet.id} wallet={wallet} />;
      })}
    </View>
  );
}
