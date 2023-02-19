import React, { useState, createRef, Ref } from "react";
import "./index.css";

import { CardGrid, Card, Group, CellButton } from "@vkontakte/vkui";

import { ReactComponent as First } from "public/img/footer/first.svg";
import { ReactComponent as Second } from "public/img/footer/second.svg";
import { ReactComponent as Third } from "public/img/footer/third.svg";
import { EPanels } from "@/App";
interface IProps {
  active: 0 | 1 | 2;
  onChange: (val: EPanels) => void;
}

const Footer: React.FC<IProps> = ({ active, onChange }) => {
  const links = [
    {
      name: "Доступные события",
      icon: <First />,
      link: EPanels.MAIN_PANEL
    },
    {
      name: "Создать событие",
      icon: <Second />,
      link: EPanels.CREATE_TICKET_PANEL
    },
    {
      name: "Мои события",
      icon: <Third />,
      link: EPanels.MY_TICKET_PANEL
    }
  ];

  return (
    <Group mode="plain">
      <CardGrid size="s">
        {links.map((_, index) => (
          <Card mode="shadow">
            <CellButton
              onClick={() => onChange(_.link)}
              className={
                active === index ? "active-footer-link" : "footer-link"
              }
              before={
                <div
                  style={{
                    marginRight: index === links.length + 1 ? "0" : "10px"
                  }}
                >
                  {_.icon}
                </div>
              }
            >
              {_.name}
            </CellButton>
          </Card>
        ))}
      </CardGrid>
    </Group>
  );
};

export default Footer;
