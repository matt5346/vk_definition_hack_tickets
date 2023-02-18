import React, { useState, createRef, useCallback } from "react";

import {
  Panel,
  Select,
  Group,
  CardGrid,
  Card,
  PanelHeaderBack,
  PanelHeader,
  FormLayout,
  FormItem,
  Text,
  DateInput,
  LocaleProvider,
  Input,
  CellButton,
  Button,
  Div,
  ModalRoot
} from "@vkontakte/vkui";
import TicketFormModal from "@/components/ticketFormModal";
import { useStores } from "@/hooks/useStores";

import "./index.css";
import { Icon28AddOutline } from "@vkontakte/icons";

interface IHomeProps {
  id: string;
  userInfo?: any;
  onBack: () => void;
}

const CreateTickets: React.FC<IHomeProps> = ({ id, onBack, userInfo }) => {
  const [purpose, setPurpose] = useState("");
  const [ticketsData, setTicketsData] = useState<any>([]);
  const [activeModal, setActiveModal] = React.useState<string | undefined>(
    undefined
  );
  const [value, setValue] = useState<Date | undefined>(() => new Date());
  const textInput = createRef<HTMLInputElement>();
  const [locale, setLocale] = useState("ru");
  const {
    AppStore: { connection, createNewTicket }
  } = useStores();

  const onChange = (e: any) => {
    const { name, value } = e.currentTarget;

    setPurpose(value);
  };

  const toggleModal = () => {
    setActiveModal(activeModal ? undefined : "createTicketModal");
  };

  const submitFullTicket = () => {
    console.log("submitFullTicket");
    createNewTicket({
      tickets: ticketsData
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>
        Добавление события
      </PanelHeader>
      <div style={{ zIndex: 1 }}>
        <ModalRoot activeModal={activeModal} onClose={toggleModal}>
          <TicketFormModal
            id={activeModal}
            onSubmit={(val: any) => {
              const tickets = ticketsData ? [...ticketsData, val] : [val];
              toggleModal();
              setTicketsData(tickets);
            }}
            onClose={toggleModal}
            dynamicContentHeight
          />
        </ModalRoot>
      </div>
      <Group mode="plain" style={!activeModal ? { zIndex: 2 } : undefined}>
        <CardGrid size="l">
          <Card className="card_wrap">
            <CardGrid size="l" className="card_wrap__form-inner">
              <Card
                mode="shadow"
                style={{ height: "100%", overflowY: "auto", padding: "20px 0" }}
              >
                <FormLayout style={{ width: "100%" }}>
                  <FormItem
                    className="form-row"
                    status={purpose ? "valid" : "error"}
                  >
                    <Text style={{ marginRight: "10px" }}>Организатор</Text>
                    <Select
                      placeholder="Выберите цель поездки"
                      onChange={onChange}
                      value={purpose}
                      name="purpose"
                      options={[
                        {
                          value: connection?.userIdentity ?? "",
                          label: "Сам"
                        }
                      ]}
                    />
                  </FormItem>
                  <FormItem className="form-row">
                    <Text style={{ marginRight: "10px" }}>Локация</Text>
                    <Input
                      style={{ minWidth: "340px" }}
                      getRef={textInput}
                      type="text"
                      placeholder="Введите адрес или ссылку на событие"
                    />
                  </FormItem>
                  <FormItem className="form-row">
                    <Text style={{ marginRight: "10px" }}>Дата и время</Text>
                    <LocaleProvider value={locale}>
                      <DateInput
                        value={value}
                        onChange={setValue}
                        enableTime
                        closeOnChange
                      />
                    </LocaleProvider>
                  </FormItem>
                  <FormItem className="form-row">
                    <Text style={{ marginRight: "10px" }}>Билеты</Text>
                    <Div style={{ width: "fit-content", padding: 0 }}>
                      <CellButton
                        style={{
                          margin: "0 0 10px 0",
                          boxSizing: "border-box"
                        }}
                        onClick={() => setActiveModal("createTicketModal")}
                        centered
                        before={<Icon28AddOutline />}
                      >
                        Добавить билет
                      </CellButton>

                      {ticketsData?.length
                        ? ticketsData.map((_: any, index: number) => {
                            return (
                              <Group>
                                <div style={{ display: "flex" }}>
                                  <Div>
                                    <Text width={500} size={16}>
                                      Имя
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                      {_.name}
                                    </Text>
                                  </Div>

                                  <Div>
                                    <Text width={500} size={16}>
                                      Кол-во
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                      {_.amount}
                                    </Text>
                                  </Div>
                                </div>
                              </Group>
                            );
                          })
                        : null}
                    </Div>
                  </FormItem>
                  <Div
                    style={{
                      width: "70%",
                      margin: "0 auto",
                      textAlign: "right"
                    }}
                  >
                    <Button
                      style={{ marginLeft: "auto" }}
                      size="l"
                      mode="primary"
                      onClick={submitFullTicket}
                    >
                      Создать
                    </Button>
                  </Div>
                </FormLayout>
              </Card>
            </CardGrid>
          </Card>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default CreateTickets;
