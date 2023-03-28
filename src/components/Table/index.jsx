import React from "react";
import { Table } from "antd";

const CustomTable = ({ data, cols }) => {
  return (
    <>
      <Table
        dataSource={data}
        columns={cols}
        size="small"
        //set pagination in center
        pagination={{ position: ["bottomCenter"], pageSize: 10 }}
      />
    </>
  );
};

export default CustomTable;
