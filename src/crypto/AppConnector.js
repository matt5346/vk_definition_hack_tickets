import Rarible from "@/crypto/EVM/rarible";

const AppConnector = {
  type: "",
  connector: null,

  getSavedConnectorName() {
    return localStorage.getItem("global-app-connector") || "rarible";
  },
  setSavedConnectorName(name) {
    localStorage.setItem("global-app-connector", name);
    return name;
  },
  clearConnectorName() {
    localStorage.setItem("global-app-connector", "");
  },

  async init(withType = null) {
    if (this.connector && !withType) return this;

    const connectorType = withType
      ? this.setSavedConnectorName(withType)
      : this.getSavedConnectorName();

    if (connectorType === "rarible") {
      this.type = "rarible";
      this.connector = new Rarible();
      await this.connector.init();
    }

    return this;
  },

  async connect(wallet) {
    console.log(this.connector, wallet, "user not connected");
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      return await this.connector.connectToWallet(wallet);
    } catch (e) {
      console.log(`Error connecting to ${wallet} `, e);
    }
    return false;
  }
};

export default AppConnector;
