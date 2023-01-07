import React from "react";
import { Space, Table, Tag } from "antd";
import { columns } from "./ColumnData";
const CustomTable = () => {
  return <Table columns={columns} style={{ width: "90%" }} />;
};

export default CustomTable;
