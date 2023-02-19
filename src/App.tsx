import React, { useState, useEffect } from "react";
// import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { useStores } from "@/hooks/useStores";
import AppConnector from "@/crypto/AppConnector";
import { observer } from "mobx-react-lite";
import Footer from "./components/footer";

// panels
import ConnectWallet from "./panels/connect";
import MainPanel from "./panels/main";
import CreateTicket from "./panels/createTicket";
import MyTickets from "./panels/myTickets";
import SingleTicket from "./panels/singleTicket";

export enum EPanels {
  CONNECT_WALLET = "connectWallet",
  MAIN_PANEL = "mainPanel",
  CREATE_TICKET_PANEL = "createTicketPanel",
  SINGLE_TICKET_PANEL = "singleTicket",
  MY_TICKET_PANEL = "myTicketPanel"
}

const App = () => {
  const [activePanel, setActivePanel] = useState(EPanels.CONNECT_WALLET);
  const [prevPanel, setPrevPanel] = useState(EPanels.CONNECT_WALLET);
  // const [getUser, setUser] = useState<UserInfo>();
  const [popout, setPopout] = useState<any>(<ScreenSpinner size="large" />);
  const {
    AppStore: { setAppReady, connection }
  } = useStores();

  const getActiveLink = (): 0 | 1 | 2 => {
    if (activePanel === EPanels.MAIN_PANEL) return 0;
    if (activePanel === EPanels.CREATE_TICKET_PANEL) return 1;
    if (activePanel === EPanels.MY_TICKET_PANEL) return 2;
    return 0;
  };

  useEffect(() => {
    console.log(process.env, "PROCESS ENV");
    console.log(connection, "AppStore");
    async function fetchData() {
      // const user = await bridge.send("VKWebAppGetUserInfo");
      // setUser(user);
      setPopout(null);

      try {
        await AppConnector.init();
        console.log("INIT");
        setActivePanel(EPanels.MAIN_PANEL);
      } catch (e) {
        console.log("user not connected", e);
      } finally {
        setAppReady();
      }
    }
    fetchData();
  }, [setAppReady, connection]);

  useEffect(() => {
    if (connection?.userIdentity) setActivePanel(EPanels.MAIN_PANEL);
  }, [connection.userIdentity]);

  const go = (e: any) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <ConnectWallet id={EPanels.CONNECT_WALLET} go={go} />
                <MainPanel
                  id={EPanels.MAIN_PANEL}
                  go={() => setActivePanel(EPanels.SINGLE_TICKET_PANEL)}
                />
                <CreateTicket
                  id={EPanels.CREATE_TICKET_PANEL}
                  onBack={() => setActivePanel(prevPanel)}
                />
                <MyTickets
                  id={EPanels.MY_TICKET_PANEL}
                  onBack={() => setActivePanel(prevPanel)}
                />
                <SingleTicket
                  id={EPanels.SINGLE_TICKET_PANEL}
                  onBack={() => setActivePanel(prevPanel)}
                />
              </View>
              <Footer
                active={getActiveLink()}
                onChange={(val) => {
                  setPrevPanel(activePanel);
                  setActivePanel(val);
                }}
              />
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default observer(App);
