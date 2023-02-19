import { useState } from "react";
import { useStores } from "@/hooks/useStores";

export const useWalletConnection = () => {
  const {
    AppStore: { connection, networks: networkOptions, wallets: walletOptions }
  } = useStores();

  const [network, setNetwork] = useState("ether");
  const [wallet, setWallet] = useState(null);

  const filteredNetworkOptions = () => {
    return [...networkOptions]
      .map((w) => ({ ...w }))
      .map((networkItem) => {
        let available = false;
        if (networkItem.available) {
          if (wallet === "ledger") {
            if (networkItem.key !== "near" && networkItem.key !== "evm")
              available = true;
          } else available = true;
        }
        networkItem.available = available;
        return networkItem;
      });
  };

  const filteredWalletOptions = () => {
    return [...walletOptions]
      .map((w) => ({ ...w }))
      .map((wallet) => {
        let available = false;
        if (wallet.available) {
          if (network === "evm") {
            if (wallet.key !== "ledger") available = true;
          } else available = network !== "near";
        }
        wallet.available = available;
        return wallet;
      });
  };

  const networkAssets = "/img/connect/";

  const submitAvailable = () => {
    if (!network) return;
    if (network !== "near") return wallet;
    else return !wallet;
  };

  const isOpen = () => !connection.userIdentity;
  return {
    isOpen,
    networks: filteredNetworkOptions,
    wallets: filteredWalletOptions,
    selectedNetwork: network,
    selectedWallet: wallet,
    networkAssets,
    close: () => {
      // can`t close
    },
    setNetwork: (value) => {
      console.log(value);
      setNetwork(value);
    },
    setWallet: (value) => setWallet(value),
    submitAvailable
  };
};
