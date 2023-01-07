import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
const items = [
  {
    key: "1",
    label: "Missed",
  },
  {
    key: "2",
    label: "Answered",
  },
  {
    key: "3",
    label: "Voice Mail",
  },
];
const DropSelect = () => (
  <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ["3"],
    }}
  >
    <Typography.Link>
      <Space>
        Call Type
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);
export default DropSelect;
