import React, { useState, createRef, useEffect } from "react";

import {
  Panel,
  CardGrid,
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
import { Icon16Microphone, Icon16Search } from "@vkontakte/icons";
import "./index.css";

interface IProps {
  id: string;
}

const Main: React.FC<IProps> = ({ id }) => {
  const [ticketsData, setTicketsData] = useState<string[] | null | undefined>(
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
    AppStore: { getAllTickets }
  } = useStores();

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
            <Div style={{ position: "relative", padding: 0 }}>
              <img
                alt="banner"
                className="banner-card__image"
                src="/img/main_banner.png"
              />
              <Div className="banner-card__text">
                <Title weight="1" size={24}>
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

            {ticketsData?.length && (
              <Group>
                {ticketsData.map((_) => {
                  if (!_.length) return null;
                  return (
                    <Div>
                      <Title
                        weight="1"
                        size={24}
                        style={{ marginBottom: "10px" }}
                      >
                        Билет {_[3]}
                      </Title>
                      <Text width={500} size={16}>
                        Организатор
                      </Text>
                      <Text style={{ fontSize: "12px", marginBottom: "10px" }}>
                        {_[0]}
                      </Text>
                      <Text width={500} size={16}>
                        Локация
                      </Text>
                      <Text style={{ fontSize: "12px" }}>{_[1]}</Text>
                    </Div>
                  );
                })}
              </Group>
            )}
          </Card>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default Main;
