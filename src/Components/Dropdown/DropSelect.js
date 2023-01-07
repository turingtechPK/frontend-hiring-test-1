import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";

const DropSelect = ({ calls, setCalls }) => {
  // const original = calls;

  // const filterCall = (val) => {
  //   console.log(original);
  //   if (val === "All") {
  //     setCalls(original);
  //   } else {
  //     let filtered = calls.filter((ele) => {
  //       return ele.call_type === val;
  //     });
  //     // console.log(filtered);
  //     setCalls(filtered);
  //   }
  // };
  const filterCall = () => {};

  const items = [
    {
      key: "1",
      label: <p onClick={() => filterCall("missed")}>Missed</p>,
    },
    {
      key: "2",
      label: <p onClick={() => filterCall("answered")}>Answered</p>,
    },
    {
      key: "3",
      label: <p onClick={() => filterCall("voicemail")}>Voicemail</p>,
    },
    {
      key: "4",
      label: <p onClick={() => filterCall("All")}>None</p>,
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["1"],
      }}
    >
      <Typography.Link style={{ color: "#4f46f8" }}>
        <Space>
          Call Type
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};
export default DropSelect;
