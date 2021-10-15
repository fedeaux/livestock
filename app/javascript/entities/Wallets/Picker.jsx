import { useApiWallets } from "generated/api";
import useBoolState from "util/useBoolState";
import { TouchableOpacity } from "react-native";

// TODO: Extract Select
export default function WalletPicker({ walletId, onChange }) {
  const { wallets, isLoading: wil } = useApiWallets();
  const [selectOpen, closeSelect, openSelect] = useBoolState();

  const selectWallet = useCallback(
    (wallet) => {
      onChange({ walletId: wallet.id });
      closeSelect();
    },
    [walletId, onChange]
  );

  if (wil) return null;

  const selectedWallet = wallets.find((wallet) => {
    return wallet.id == walletId;
  });

  return (
    <TouchableOpacity onPress={openSelect}>
      <Text>{selectedWallet?.name}</Text>

      {selectOpen &&
        wallets.map((wallet) => {
          return (
            <TouchableOpacity
              key={wallet.id}
              onPress={() => {
                return selectWallet(wallet);
              }}
            >
              <Text>{wallet.name}</Text>
            </TouchableOpacity>
          );
        })}
    </TouchableOpacity>
  );
}
