import styles from "../styles/Table.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { formatDate, formatDuration } from "../services/date-formatter";

import { call } from "../Interfaces/calls";
import { tableComponent } from "../Interfaces/tableComponent";
import Table from "antd/lib/table";
import { Pagination } from "antd";

function TableComponent({
  calls,
  totalCalls,
  hasNextPage,
  handlePaginationChange,
  handleAddNote,
}: tableComponent) {
  const [skip, setSkip] = useState(1);

  useEffect(() => {
    handlePaginationChange(skip);
  }, [skip]);

  const columns = [
    {
      title: "CALL Type",
      dataIndex: "call_type",
      key: "call_type",
      render: (_, call: call) => {
        return (
          <span
            className={
              call.call_type === "voicemail"
                ? styles.blueText
                : call.call_type === "answered"
                ? styles.greenText
                : styles.redText
            }
          >
            {call.call_type}
          </span>
        );
      },
    },
    {
      title: "DIRECTION",
      dataIndex: "direction",
      key: "direction",
      render: (_, call: call) => {
        return <span className={styles.blueText}> {call.direction}</span>;
      },
    },
    {
      title: "DURATION",
      dataIndex: "duration",
      key: "duration",
      render: (_, call: call) => {
        return (
          <div className={styles.durationContainer}>
            <div>{formatDuration(call.duration)}</div>
            <div className={styles.blueText}>
              {"( " + call.duration + " seconds)"}
            </div>
          </div>
        );
      },
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
      render: (_, call: call) => {
        return <>{formatDate(call.created_at)}</>;
      },
    },
    {
      title: "STATUS",
      dataIndex: "is_archived",
      key: "is_archived",
      render: (_, call: call) => (
        <div className={call.is_archived ? styles.archived : styles.unArchive}>
          {call.is_archived ? "Archived" : "Unarchive"}
        </div>
      ),
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      render: (_, call: call) => (
        <div
          className={styles.btn}
          onClick={() => {
            handleAddNote(call.id);
          }}
        >
          Add Note
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        dataSource={calls}
        columns={columns}
        pagination={false}
        className={styles.table}
      />

      <div className={styles.paginationContainer}>
        {" "}
        <Pagination
          total={totalCalls}
          onChange={(pageNumber) => {
            setSkip((pageNumber - 1) * 10);
          }}
          showSizeChanger={false}
          defaultCurrent={1}
        />
      </div>
      <div className={styles.paginationToast}>
        {1 +
          skip +
          " - " +
          (skip + 10 < totalCalls ? skip + 10 : totalCalls) +
          " of " +
          totalCalls}{" "}
        results{" "}
      </div>
    </div>
  );
}
export default TableComponent;
