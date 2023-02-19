import React from "react";

import {
  Panel,
  Button,
  Group,
  CardGrid,
  Card,
  Div,
  ModalRoot,
  Text,
  CardScroll,
  SimpleCell,
  Image,
  PanelHeader,
  Spacing,
  Cell
} from "@vkontakte/vkui";
import wallabyPic from "./wallaby.png";
import verifierQr from "./verifier-qr.png";

interface IHomeProps {
  id: string;
}

const MyTickets: React.FC<IHomeProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <Group style={{ paddingBottom: 100 }}>
        <CardGrid style={{ background: "none", marginTop: 60 }}>
          {/*<PanelHeader>Ваши билеты</PanelHeader>*/}
          <CardScroll size="l" style={{ width: 900, height: 100 }}>
            <Card
              mode="shadow"
              style={{ backgroundColor: "white", width: 450 }}
            >
              <Cell before={<Image src={verifierQr} size={96} />}>
                <Text weight="2">Wallaby Feeding</Text>
                <Spacing size={6} />
                <Text>24.03.2023 18:00</Text>
                <Spacing size={2} />
                <Text>Melbourne, Docklands</Text>
                <Spacing size={6} />
                <Text weight="2">Early Bird VIP</Text>
              </Cell>
              <Div style={{ margin: 12, paddingLeft: 18 }}>
                ID билета: 0xfsdke34fo5ppsdfyw8q
              </Div>
            </Card>
            <Card
              mode="shadow"
              style={{ backgroundColor: "white", width: 450 }}
            >
              <Cell before={<Image src={verifierQr} size={96} />}>
                <Text weight="2">Wallaby Feeding</Text>
                <Spacing size={6} />
                <Text>24.03.2023 18:00</Text>
                <Spacing size={2} />
                <Text>Melbourne, Docklands</Text>
                <Spacing size={6} />
                <Text weight="2">Early Bird VIP</Text>
              </Cell>
              <Div style={{ margin: 12, paddingLeft: 18 }}>
                ID билета: 0xfsdke34fo5ppsdfyw8q
              </Div>
            </Card>
          </CardScroll>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default MyTickets;
