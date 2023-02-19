import React from "react";

import {
  Panel,
  Group,
  CardGrid,
  Card,
  Div,
  Text,
  CardScroll,
  Image,
  Spacing,
  PanelHeader,
  PanelHeaderBack,
  Cell
} from "@vkontakte/vkui";
import verifierQr from "./verifier-qr.png";

interface IProps {
  id: string;
  onBack: () => void;
}

const MyTickets: React.FC<IProps> = ({ id, onBack }) => {
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>
        Ваши билеты
      </PanelHeader>
      <Group mode="plain">
        <CardGrid style={{ background: "none", marginTop: 60 }}>
          <CardScroll size="l" style={{ width: 900 }}>
            <Card mode="shadow" style={{ width: 450 }}>
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
            <Card mode="shadow" style={{ width: 450 }}>
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
