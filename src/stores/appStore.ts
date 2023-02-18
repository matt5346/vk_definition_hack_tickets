import { Ethereum } from "@/crypto/helpers";
import { makeAutoObservable } from "mobx";

class AppStore {
  constructor() {
    makeAutoObservable(this);
  }
  isAppReady = false;
  isCollectionsLoading = false;
  isWalletConnectModalOpen = false;
  walletConnectCode = "";
  walletConnectCloseHandler = null;

  networks = [
    {
      id: 1,
      name: "Ethereum",
      key: "ether",
      color: "#627EEA",
      available: true
    },
    {
      id: 137,
      name: "Polygon",
      key: "matic",
      color: "#627EEA",
      available: true
    }
  ];
  wallets = [
    {
      id: 1,
      name: "MetaMask",
      key: "Metamask",
      color: "#627EEA",
      available: true
    },
    {
      id: 3,
      name: "WalletConnect",
      key: "walletconnect",
      color: "#D9ECFF",
      available: true
    },
    { id: 2, name: "1inch", key: "1inch", color: "#0E131D", available: true }
  ];

  connection = {
    userIdentity: null,
    userNetworkName: null,
    userNetworkSupported: false
  };

  explorers = {
    transaction: "",
    account: "",
    block: ""
  };
  shopURL = "";

  processStatus = {
    code: "",
    addition: []
  };
  userAmount = 0;

  setUserAmount(value: any) {
    this.userAmount = value;
  }
  setProcessStatus(statusCode = "", ...additionParams: any) {
    this.processStatus.code = statusCode;
    // this.processStatus.addition.splice(
    //   0,
    //   this.processStatus.addition.length,
    //   ...additionParams
    // );
  }
  openWalletConnectQR(copyCode: any, closeHandler: any) {
    this.walletConnectCode = copyCode;
    this.walletConnectCloseHandler = closeHandler;
    this.isWalletConnectModalOpen = true;
  }
  closeWalletConnectQR({ isAutomatic = false } = {}) {
    if (!isAutomatic && this.walletConnectCloseHandler) {
      // this.walletConnectCloseHandler();
    }
    this.isWalletConnectModalOpen = false;
    this.walletConnectCloseHandler = null;
  }
  setAppReady() {
    this.isAppReady = true;
  }
  setUserIdentity(value = null) {
    this.connection.userIdentity = value;
  }
  setUserNetworkName(value = null) {
    this.connection.userNetworkName = value;
    if (value) {
      const { transactionExplorer, accountExplorer, blockExplorer } =
        Ethereum.getData(value);
      this.explorers.transaction = transactionExplorer;
      this.explorers.account = accountExplorer;
      this.explorers.block = blockExplorer;
      console.log(value, "value");
      const { store } = Ethereum.getSettings(value);
      this.shopURL = store;
    }
  }
}

export default AppStore;
