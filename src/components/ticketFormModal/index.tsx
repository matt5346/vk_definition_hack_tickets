/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createRef, useState } from "react";

import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  usePlatform,
  useAdaptivityConditionalRender,
  PanelHeaderButton,
  FormItem,
  Input,
  Platform,
  Button,
  Div
} from "@vkontakte/vkui";

import { Icon24Dismiss } from "@vkontakte/icons";

interface IProps {
  id: string | undefined;
  onClose: () => void;
  onSubmit: (vals: any) => void;
  dynamicContentHeight: boolean;
}

const DynamicModalPage: React.FC<IProps> = ({
  onClose,
  onSubmit,
  ...props
}) => {
  const platform = usePlatform();
  const { sizeX } = useAdaptivityConditionalRender();
  const [ticketName, setTicketName] = useState<string>("");
  const [ticketAmount, setTicketAmount] = useState<string>("");

  const submit = () => {
    console.log(ticketName, ticketAmount, "ticketName ticketsAmount");
    onSubmit({
      name: ticketName,
      amount: ticketAmount
    });
  };

  return (
    <ModalPage
      {...props}
      header={
        <ModalPageHeader
          before={
            sizeX.compact &&
            platform === Platform.ANDROID && (
              <PanelHeaderClose
                className={sizeX.compact.className}
                onClick={onClose}
              />
            )
          }
          after={
            sizeX.compact &&
            platform === Platform.IOS && (
              <PanelHeaderButton
                className={sizeX.compact.className}
                onClick={onClose}
              >
                <Icon24Dismiss />
              </PanelHeaderButton>
            )
          }
        >
          Введите данные события
        </ModalPageHeader>
      }
    >
      <Group>
        <FormItem top="Имя">
          <Input
            onChange={(e) => setTicketName(e.currentTarget.value)}
            type="text"
            placeholder="Введите имя"
          />
        </FormItem>
        <FormItem top="Кол-во">
          <Input
            type="text"
            placeholder="Введите кол-во"
            onChange={(e) => setTicketAmount(e.currentTarget.value)}
          />
        </FormItem>
      </Group>
      <Div style={{ width: "100%", textAlign: "right" }}>
        <Button
          style={{ marginRight: "45px" }}
          size="l"
          mode="primary"
          onClick={submit}
        >
          Добавить билет
        </Button>
      </Div>
    </ModalPage>
  );
};

export default DynamicModalPage;
