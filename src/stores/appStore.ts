import { Ethereum } from "@/crypto/helpers";
import { makeAutoObservable } from "mobx";
import TicketsAbi from "@/abi/TicketsAbi.json";
import SmartContract from "@/crypto/EVM/SmartContract";
import { Contract } from "ethers";
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
    }
    // { id: 2, name: "1inch", key: "1inch", color: "#0E131D", available: true }
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

  setUserAmount = (value: any) => {
    this.userAmount = value;
  };
  setProcessStatus = (statusCode = "", ...additionParams: any) => {
    this.processStatus.code = statusCode;
    // this.processStatus.addition.splice(
    //   0,
    //   this.processStatus.addition.length,
    //   ...additionParams
    // );
  };
  openWalletConnectQR = (copyCode: any, closeHandler: any) => {
    this.walletConnectCode = copyCode;
    this.walletConnectCloseHandler = closeHandler;
    this.isWalletConnectModalOpen = true;
  };
  closeWalletConnectQR = ({ isAutomatic = false } = {}) => {
    if (!isAutomatic && this.walletConnectCloseHandler) {
      // this.walletConnectCloseHandler();
    }
    this.isWalletConnectModalOpen = false;
    this.walletConnectCloseHandler = null;
  };

  setAppReady = () => {
    this.isAppReady = true;
  };

  setUserIdentity = (value = null) => {
    this.connection.userIdentity = value;
  };

  setUserNetworkName = (value = null) => {
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
  };

  createNewTicket = async (val: string[]) => {
    const provider = new SmartContract({ address: null })._getProvider();
    if (!provider) return;

    console.log(val, "val");
    console.log(this.connection.userIdentity, "this.connection.userIdentity");

    // goerli old erc721 contract
    // 0xb65caa6666c55ec9ada1a41e98fbb164a7e2be55
    const contract = new Contract(
      "0x1b69353d1edb2049d5ae7c26b404447eab6c4e9a",
      TicketsAbi,
      provider
    );
    const mintReq = await contract.doEvent([], {
      gasLimit: 5000000,
      gasPrice: 1300000000
    });
    console.log(mintReq, "mintReq");
  };
}

export default AppStore;
