import React, { useState } from "react";

import {
  Panel,
  Button,
  Card,
  Div,
  Text,
  Title,
  FormLayout,
  FormItem,
  PanelHeader,
  PanelHeaderBack,
  Input
} from "@vkontakte/vkui";

import "./index.css";

import { useStores } from "@/hooks/useStores";
import { unixToDate } from "@/utils/dates";
import { ReactComponent as TicketIcon } from "public/img/ticket.svg";
import { ReactComponent as TicketIconBlue } from "public/img/ticket_blue.svg";
import { ReactComponent as LocationIcon } from "public/img/location.svg";

interface IProps {
  id: string;
  onBack: () => void;
}

const SingleTicket: React.FC<IProps> = ({ id, onBack }) => {
  const [getTicketNumber, setTicketNumber] = useState<string>("0");
  const {
    AppStore: { currentTicket, buyNewTicket }
  } = useStores();

  const buyTicket = () => {
    console.log(getTicketNumber, "buyTicket");
    buyNewTicket(getTicketNumber);
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>
        Билет
      </PanelHeader>
      <div className="form-container">
        <Card
          mode="shadow"
          style={{ margin: "20px auto", width: "100%", maxWidth: "520px" }}
        >
          <Div>
            <Title weight="1" size={24} style={{ marginBottom: "5px" }}>
              Билет {currentTicket[3]}
            </Title>
            <Text weight="1" size={16}>
              Организатор
            </Text>
            <Text style={{ fontSize: "12px", marginBottom: "5px" }}>
              {currentTicket[0]}
            </Text>
            <Div className="text-row">
              <Text weight="1" size={16}>
                Начало продаж
              </Text>
              <Text
                style={{
                  fontSize: "12px",
                  marginLeft: "10px"
                }}
              >
                {unixToDate(+currentTicket[2])}
              </Text>
            </Div>
            <Div className="text-row">
              <TicketIcon />
              <Text
                style={{
                  fontSize: "12px",
                  marginLeft: "10px"
                }}
              >
                Всего {currentTicket[4] ?? 0} Билетов
              </Text>
            </Div>
            <Div className="text-row">
              <LocationIcon />
              <Text
                style={{
                  fontSize: "12px",
                  marginLeft: "10px"
                }}
                size={16}
              >
                Локация {currentTicket[1]}
              </Text>
            </Div>
          </Div>
        </Card>

        <FormLayout style={{ width: "100%" }}>
          <FormItem className="form-row_single-ticket">
            <TicketIconBlue style={{ marginRight: "10px" }} />
            <Input
              style={{ minWidth: "340px" }}
              onChange={(e) => setTicketNumber(e.currentTarget.value)}
              type="number"
              placeholder="Введите кол-во билетов"
            />
          </FormItem>
          <Text>
            Билеты доступны тем, кого организатор внес в список. Отправьте
            запрос для получения билета.{" "}
          </Text>
        </FormLayout>
        <Button
          style={{ marginTop: "20px" }}
          size="l"
          mode="primary"
          onClick={buyTicket}
        >
          Купить
        </Button>
      </div>
    </Panel>
  );
};

export default SingleTicket;
