import React from "react";
import { Table } from "antd";
import { formatDate, formatTime } from "./HelperFuncs";
import "./CustomTable.css";
const CustomTable = ({ callsData, setModalOpen, setSelectedCall }) => {
  const columns = [
    {
      title: "CALL TYPE",
      dataIndex: "call_type",
      key: "call_type",
      render: (call_type) => (
        <p
          style={{
            color:
              call_type === "answered"
                ? "#6CD8CB"
                : call_type === "missed"
                ? "#D3596C"
                : "#2A5DE8",
          }}
        >
          {call_type.charAt(0).toUpperCase() + call_type.slice(1)}
        </p>
      ),
    },

    {
      title: "DIRECTION",
      dataIndex: "direction",
      key: "direction",
      render: (direction) => (
        <p
          style={{
            color: "#2A5DE8",
          }}
        >
          {direction.charAt(0).toUpperCase() + direction.slice(1)}
        </p>
      ),
    },
    {
      title: "DURATION",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => (
        <div>
          <p>{formatTime(duration)}</p>
          <p
            style={{
              color: "#2A5DE8",
            }}
          >
            {"(" + duration + " seconds" + ")"}
          </p>
        </div>
      ),
    },
    {
      title: "FROM",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "TO",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "VIA",
      dataIndex: "via",
      key: "via",
    },
    {
      title: "CREATED AT",
      dataIndex: "created_at",
      key: "created_at",
      render: (created) => <p>{formatDate(created)}</p>,
    },
    {
      title: "STATUS",
      dataIndex: "is_archived",
      key: "is_archived",
      render: (is_archived) =>
        is_archived ? (
          <div
            style={{
              backgroundColor: "#EDFBFA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
            }}
          >
            <p style={{ color: "#0ACDBB" }}>Archived</p>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#EEEEEE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "25px",
            }}
          >
            <p style={{ color: "#808080" }}>Unarchive</p>
          </div>
        ),
    },
    {
      title: "ACTIONS",
      key: "details",
      render: (details) => (
        <div
          onClick={() => {
            handleModal(details);
          }}
          style={{
            cursor: "pointer",
            backgroundColor: "#4f46f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "25px",
          }}
        >
          <p style={{ color: "white" }}>Add Note</p>
        </div>
      ),
    },
  ];
  const handleModal = (details) => {
    setSelectedCall(details);
    setModalOpen(true);
  };
  return (
    <Table
      columns={columns}
      dataSource={callsData}
      size="small"
      style={{
        width: "100%",
        border: "1px solid #F4F4F9",
        marginBottom: "50px",
      }}
      pagination={{
        position: ["none"],
      }}
    />
  );
};

export default CustomTable;
