import React, { useState } from "react";

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
  Spinner,
  ModalRoot
} from "@vkontakte/vkui";
import TicketFormModal from "@/components/ticketFormModal";
import { useStores } from "@/hooks/useStores";
import dayjs from "dayjs";

import "./index.css";
import { Icon28AddOutline } from "@vkontakte/icons";

interface IHomeProps {
  id: string;
  userInfo?: any;
  onBack: () => void;
}

type TType = {
  name: string;
  amount: string;
};

const CreateTickets: React.FC<IHomeProps> = ({ id, onBack, userInfo }) => {
  const [purpose, setPurpose] = useState<string>("");
  const [getLocation, setLocation] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [ticketsData, setTicketsData] = useState<TType[]>([]);
  const [activeModal, setActiveModal] = React.useState<string | undefined>(
    undefined
  );
  const [ticketDate, setTicketDate] = useState<Date | undefined>(
    () => new Date()
  );
  const {
    AppStore: { connection, createNewTicket }
  } = useStores();

  const onChange = (e: any) => {
    const { value } = e.currentTarget;

    setPurpose(value);
  };

  const toggleModal = () => {
    setActiveModal(activeModal ? undefined : "createTicketModal");
  };

  const submitFullTicket = async () => {
    console.log(purpose, "submitFullTicket");
    setLoading(true);
    await createNewTicket([
      purpose,
      getLocation,
      dayjs(ticketDate).unix().toString(),
      ticketsData[0].name,
      ticketsData[0].amount
    ]);
    setLoading(false);
    onBack();
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
                      onChange={(e) => setLocation(e.currentTarget.value)}
                      type="text"
                      placeholder="Введите адрес или ссылку на событие"
                    />
                  </FormItem>
                  <FormItem className="form-row">
                    <Text style={{ marginRight: "10px" }}>Дата и время</Text>
                    <LocaleProvider value={"ru"}>
                      <DateInput
                        value={ticketDate}
                        onChange={setTicketDate}
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
                        disabled={ticketsData?.length ? true : false}
                      >
                        Добавить билет
                      </CellButton>

                      {ticketsData?.length
                        ? ticketsData.map((_: any, index: number) => {
                            return (
                              <Group key={index}>
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
                    {!isLoading ? (
                      <Button
                        style={{ marginLeft: "auto" }}
                        size="l"
                        mode="primary"
                        onClick={submitFullTicket}
                      >
                        Создать
                      </Button>
                    ) : (
                      <Spinner />
                    )}
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
