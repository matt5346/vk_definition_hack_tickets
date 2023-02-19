import React, { useState, createRef, useEffect } from "react";

import {
  Panel,
  CardGrid,
  CardScroll,
  Card,
  Div,
  Group,
  Title,
  Text,
  Headline,
  FormLayout,
  FormItem,
  IconButton,
  Input
} from "@vkontakte/vkui";

import { useStores } from "@/hooks/useStores";
import { unixToDate } from "@/utils/dates";
import { ReactComponent as TicketIcon } from "public/img/ticket.svg";
import { ReactComponent as LocationIcon } from "public/img/location.svg";
import { Icon16Microphone, Icon16Search } from "@vkontakte/icons";
import "./index.css";

interface IProps {
  id: string;
  go: () => void;
}

const Main: React.FC<IProps> = ({ id, go }) => {
  const [ticketsData, setTicketsData] = useState<string[][] | null | undefined>(
    []
  );
  const textInput = createRef<HTMLInputElement>();
  const search = () => {
    console.log(textInput, "text");
  };
  const [formItemStatus, setFormItemStatus] = useState<
    "default" | "error" | "valid" | undefined
  >("default");
  const {
    AppStore: { getAllTickets, setChoosenTicket }
  } = useStores();

  const handleTicketClick = (key: number) => {
    if (!ticketsData) return;
    setChoosenTicket(ticketsData[key], key.toString());
    go();
  };

  useEffect(() => {
    const reqTicketsData = async () => {
      const tickets = (await getAllTickets())?.filter((_) => {
        if (!_ || _[0] === "") return false;
        return _;
      });
      setTicketsData(tickets);
    };
    reqTicketsData();
  }, [getAllTickets]);

  return (
    <Panel id={id}>
      <Group mode="plain">
        <CardGrid size="l">
          <Card className="banner-card">
            <Div style={{ margin: "auto", textAlign: "center" }}>
              Выбор События
            </Div>
            <Div style={{ position: "relative", display: "flex", padding: 0 }}>
              <img
                alt="banner"
                className="banner-card__image"
                src="/img/main_banner.png"
              />
              <Div className="banner-card__text">
                <Title style={{ color: "#fff" }} weight="1" size={24}>
                  Next generation of tickets
                </Title>
                <Headline
                  style={{ color: "#C4C4C4", marginTop: "5px" }}
                  weight="2"
                  size={20}
                >
                  Powering events with WEB 3.0
                </Headline>
              </Div>
            </Div>
            <Text weight="2">События, для которых доступны NFT билеты</Text>

            <FormLayout>
              <FormItem style={{ padding: "12px 0" }} status={formItemStatus}>
                <Input
                  getRef={textInput}
                  type="text"
                  placeholder="Поиск"
                  before={
                    <IconButton
                      hoverMode="opacity"
                      aria-label="Аудиозапись"
                      onClick={search}
                    >
                      <Icon16Search />
                    </IconButton>
                  }
                  after={
                    <IconButton hoverMode="opacity" aria-label="Аудиозапись">
                      <Icon16Microphone />
                    </IconButton>
                  }
                />
              </FormItem>
            </FormLayout>

            {ticketsData?.length && ticketsData?.length > 0 ? (
              <Group mode="plain" className="tickets-cards">
                <CardGrid size="l" style={{ marginBottom: "20px" }}>
                  <CardScroll size="l" style={{ width: "520px" }}>
                    {ticketsData.map((_, index) => {
                      if (!_.length) return null;
                      return (
                        <Card
                          key={index}
                          onClick={() => handleTicketClick(index)}
                          mode="shadow"
                          style={{ width: 450, margin: "8px 15px 8px 0" }}
                        >
                          <Div>
                            <Title
                              weight="1"
                              size={24}
                              style={{ marginBottom: "5px" }}
                            >
                              Билет {_[3]}
                            </Title>
                            <Text weight="1" size={16}>
                              Организатор
                            </Text>
                            <Text
                              style={{ fontSize: "12px", marginBottom: "5px" }}
                            >
                              {_[0]}
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
                                {unixToDate(+_[2])}
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
                                Всего {_[4] ?? 0} Билетов
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
                                Локация {_[1]}
                              </Text>
                            </Div>
                          </Div>
                        </Card>
                      );
                    })}
                  </CardScroll>
                </CardGrid>
              </Group>
            ) : null}
          </Card>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default Main;
