/* eslint-disable import/no-anonymous-default-export */
import { stringCompare } from "utils/string";
import * as Ethereum from "@/crypto/helpers/Ethereum";

export default {
  network: {
    name: null,
    id: null
  },
  userIdentity: null,
  disconnectMethod: null,

  // JsonRpcProvider or Web3Provider Signer for interact with contract
  provider: null,
  providerForENSCheck: null,
  blockchain: null,
  wallet: null,

  setConnection({
    network = { name: null, id: null },
    userIdentity = null,
    disconnectMethod = null,
    provider = null,
    providerType = null,
    blockchain = null,
    wallet = null
  } = {}) {
    this.network.name = network.name;
    this.network.id = network.id;
    this.userIdentity = userIdentity;
    this.disconnectMethod = disconnectMethod;
    this.blockchain = blockchain;
    this.wallet = wallet;

    if (provider && providerType) {
      this.provider =
        providerType === "Web3Provider" ? provider.getSigner() : provider;
      this.providerForENSCheck = provider;
    } else {
      this.provider = null;
      this.providerForENSCheck = null;
    }

    if (Ethereum.AppStorage.getStore()) {
      Ethereum.AppStorage.getStore().AppStore.setUserNetworkName(network.name);
      Ethereum.AppStorage.getStore().AppStore?.setUserIdentity(userIdentity);
    }
  },

  clearConnection() {
    this.setConnection();
  },

  setNetwork(name = null, chainId = null) {
    this.network.name = name;
    this.network.id = chainId;
    Ethereum.AppStorage.getStore().setUserNetworkName(name);
  },

  getNetwork() {
    return this.network;
  },

  setUserIdentity(value) {
    this.userIdentity = value;
    Ethereum.AppStorage.getStore().setUserIdentity(value);
  },

  getUserIdentity() {
    return this.userIdentity;
  },

  setDisconnectMethod(handler) {
    this.disconnectMethod = handler;
  },

  // set provider object for interact with contract in future
  setProvider(provider, type = "JsonRpcProvider") {
    this.provider = type === "Web3Provider" ? provider.getSigner() : provider;
    this.providerForENSCheck = provider;
  },

  getProvider() {
    return this.provider;
  },

  setWallet(wallet) {
    this.wallet = wallet;
  },

  getWallet() {
    return this.wallet;
  },

  // user log out
  async logOut() {
    if (typeof this.disconnectMethod === "function") {
      // metamask, walletConnect, ledger return promise, all methods automatically reload page
      // near does not return promise
      try {
        await this.disconnectMethod();
      } catch (e) {
        console.log("Error logout", e);
      }
    } else {
      console.log("logOut method not detected");
    }
  },

  isAdmin() {
    const { adminAddress } = Ethereum.getSettings(this.getNetwork().name);
    return stringCompare(this.getUserIdentity(), adminAddress);
  }
};
