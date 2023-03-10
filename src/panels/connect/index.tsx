import React from "react";

import {
  Panel,
  Button,
  Group,
  CardGrid,
  Card,
  Div,
  ModalRoot
} from "@vkontakte/vkui";

import DynamicModalPage from "@/components/walletsModal";
import "./index.css";

const MODAL_PAGE_DYNAMIC = "dynamic";

interface IHomeProps {
  id: string;
  go: (e: any) => void;
}

const Home: React.FC<IHomeProps> = ({ id, go }) => {
  const [activeModal, setActiveModal] = React.useState<string | null>(
    "dynamic"
  );
  const toggleModal = () => {
    console.log("toggleModal");
    setActiveModal(activeModal ? null : "dynamic");
  };

  return (
    <Panel id={id}>
      <Group mode="plain">
        <CardGrid size="l">
          <Card className="card_wrap">
            <div style={{ zIndex: 50 }}>
              <ModalRoot activeModal={activeModal} onClose={toggleModal}>
                <DynamicModalPage
                  id={MODAL_PAGE_DYNAMIC}
                  onClose={toggleModal}
                  dynamicContentHeight
                />
              </ModalRoot>
            </div>
            <Div style={{ margin: "auto", textAlign: "center" }}>
              <Button size="l" mode="primary" onClick={toggleModal}>
                Подключить web3 кошелёк
              </Button>
            </Div>
          </Card>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default Home;
