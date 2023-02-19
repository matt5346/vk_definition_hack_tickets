import { Ethereum } from "@/crypto/helpers";
import { makeAutoObservable } from "mobx";
import TicketsAbi from "@/abi/TicketsAbi.json";
import SmartContract from "@/crypto/EVM/SmartContract";
import { Contract } from "ethers";
import web3 from "web3";

const contractId = "0x11B7B6829bae887d823DBE6024aABFaabB0a1Afd";

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

  currentTicketIndex = "0";
  currentTicket: string[] = [];

  setChoosenTicket = (ticket: string[], key: string) => {
    this.currentTicket = ticket;
    this.currentTicketIndex = key;
  };

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

  // getUserTicket = async (): Promise<string[][]> => {

  // };

  buyNewTicket = async (amount: string): Promise<boolean> => {
    console.log(amount, "buyNewTicket");
    const provider = new SmartContract({ address: null })._getProvider();
    if (!provider) return false;

    console.log(this.currentTicketIndex, "this.connection.userIdentity");
    const contract = new Contract(contractId, TicketsAbi, provider);
    const mintReq = await contract.buyTicket(this.currentTicketIndex, {
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
    console.log("new ticket Created!");
    return true;
  };

  getAllTickets = async (): Promise<string[][] | undefined | null> => {
    console.log("");
    const provider = new SmartContract({ address: null })._getProvider();
    if (!provider) return null;
    const contract = new Contract(contractId, TicketsAbi, provider);
    const numberOfTickets: string = (
      await contract.totalNumberOfTickets()
    ).toString();
    const dataOfTickets = await Promise.all(
      [...Array(+numberOfTickets)].map(async (_, index) => {
        console.log(index, "RESPONE dataOfTickets1");
        const resp = await contract.requestTicketsData(index);
        console.log(resp, "RESPONE dataOfTickets2");
        return resp;
      })
    );

    console.log(dataOfTickets, "dataOfTickets");
    return dataOfTickets;
  };

  createNewTicket = async (val: string[]): Promise<boolean> => {
    const provider = new SmartContract({ address: null })._getProvider();
    if (!provider) return false;

    console.log(val, "val");
    console.log(this.connection.userIdentity, "this.connection.userIdentity");
    const contract = new Contract(contractId, TicketsAbi, provider);
    const mintReq = await contract.doEvent(val, {
      gasLimit: 5500000,
      gasPrice: 1500000000
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
    console.log("new ticket Created!");
    return true;
  };
}

export default AppStore;
