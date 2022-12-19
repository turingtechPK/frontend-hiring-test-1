import styles from "../styles/dashboard.module.css";
import { getDate, getDuration } from "../src/utils/index";
import Table from "antd/lib/table";

function CallsTable(props) {
  const { calls, handleAddNote, handleArchiveCall } = props;

  const columns = [
    {
      title: "CALL TYPE",
      dataIndex: "call_type",
      key: "call_type",
      render: (_, call) => {
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
      render: (_, call) => {
        return <span className={styles.blueText}> {call.direction}</span>;
      },
    },
    {
      title: "DURATION",
      dataIndex: "duration",
      key: "duration",
      render: (_, call) => {
        return (
          <div className={styles.durationContainer}>
            <div>{getDuration(call.duration)}</div>
            <div className={styles.blueText}>
              {"( " + call.duration + " milliseconds)"}
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
      render: (_, call) => {
        return <>{getDate(call.created_at)}</>;
      },
    },
    {
      title: "STATUS",
      dataIndex: "is_archived",
      key: "is_archived",
      render: (_, call) => (
        <div className={call.is_archived ? styles.archived : styles.unArchive} onClick={()=>{
          handleArchiveCall(call.id)
        }}>
          {call.is_archived ? "Archived" : "Unarchive"}
        </div>
      ),
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      render: (_, call) => (
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
    </div>
  );
}
export default CallsTable;
