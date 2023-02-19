import { Ethereum } from "@/crypto/helpers";
import { makeAutoObservable } from "mobx";
import TicketsAbi from "@/abi/TicketsAbi.json";
import SmartContract from "@/crypto/EVM/SmartContract";
import { Contract } from "ethers";
import web3 from "web3";

const contractId = "0x70d3fE4E0D8883E06A511304Bce71ffEA001AF4c";

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

  getNumberOfTickets = async () => {
    console.log("");
    const provider = new SmartContract({ address: null })._getProvider();
    if (!provider) return;
    const contract = new Contract(contractId, TicketsAbi, provider);
    const numberOfTickets: string = (
      await contract.totalNumberOfTickets()
    ).toString();
    const dataOfTickets = [...Array(+numberOfTickets)].map(async (_, index) => {
      console.log(index, "RESPONE dataOfTickets1");
      const resp = await contract.requestTicketsData(index + 1);
      console.log(resp, "RESPONE dataOfTickets2");
    });

    console.log(numberOfTickets, "mintReq");
    console.log(numberOfTickets.toString(), "mintReq.value");
  };

  getAllTickets = async (eventId: string) => {
    console.log(eventId, "eventId");
  };

  createNewTicket = async (val: string[]) => {
    const provider = new SmartContract({ address: null })._getProvider();
    if (!provider) return;

    console.log(val, "val");
    console.log(this.connection.userIdentity, "this.connection.userIdentity");
    const contract = new Contract(contractId, TicketsAbi, provider);
    const mintReq = await contract.doEvent(val, {
      gasLimit: 5000000,
      gasPrice: 1300000000
    });
    console.log(mintReq, "mintReq");
    console.log(mintReq.value.toString(), "mintReq.value");
    if (mintReq.value) {
      console.log(
        web3.utils.fromWei(mintReq.value.toString(), "ether"),
        "mintReq----- RESULT"
      );
    }
    await mintReq.wait();
  };
}

export default AppStore;
