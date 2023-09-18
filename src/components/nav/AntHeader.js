import { Header } from "antd/es/layout/layout";
import React from "react";
import WidgetMenu from "./WidgetMenu";
import { theme } from "antd";

const AntHeader = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <div className="logo" />
        <WidgetMenu />
      </Header>
    </>
  );
};

export default AntHeader;
