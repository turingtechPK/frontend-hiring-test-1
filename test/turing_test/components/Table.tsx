import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { getData, getPaginationData } from "../utilities/api";
import DetailModal from "./modal";

function Table() {
  const [callsData, setCallsData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [curId, setCurId] = useState("");
  useEffect(() => {
    const retreiveData = async () => {
      var res = await getData();
      setCallsData(res.data.nodes);
    };
    retreiveData();
  }, []);
  const columns = [
    {
      dataField: "call_type",
      text: "CALL TYPE",
      formatter: (cell: any, row: any) => {
        return (
          <span
            className={
              row.call_type === "voicemail"
                ? "voicemail"
                : row.call_type === "answered"
                ? "answered"
                : "missed"
            }
          >
            {row.call_type}
          </span>
        );
      },
    },
    {
      dataField: "direction",
      text: "DIRECTION",
      formatter: (cell: any, row: any) => {
        return <span className="voicemail">{row.direction}</span>;
      },
    },
    {
      dataField: "duration",
      text: "DURATION",
    },
    {
      dataField: "from",
      text: "FROM",
    },
    {
      dataField: "to",
      text: "TO",
    },
    {
      dataField: "via",
      text: "VIA",
    },
    {
      dataField: "created_at",
      text: "CREATED AT",
    },
    {
      dataField: "is_archived",
      text: "STATUS",
      formatter: (cell: any, row: any) => {
        return (
          <span
            className={`status ${row.is_archived ? "Archived" : "Unarchive"}`}
          >
            {row.is_archived ? "Archived" : "Unarchive"}
          </span>
        );
      },
    },
    {
      dataField: "",
      text: "ACTIONS",
      formatter: (cell, row) => {
        return (
          <button
            className="btn btn-note"
            onClick={() => {
              console.log("open");
              setModalStatus(true);
              setCurId(row.id);
            }}
          >
            Add Note
          </button>
        );
      },
    },
  ];
  const paginationCall = async (offset: number) => {
    console.log(offset, " offset");
    const res = await getPaginationData(offset);
    setCallsData(res.data.nodes);
    setOffset(offset);
    setHasNext(res.data.hasNextPage);
  };
  return (
    <>
      <h3 className="m-4">Turing Technoloogies Frontend Test</h3>
      <BootstrapTable keyField="id" data={callsData} columns={columns} />
      <div className="pagination">
        <button
          className="btn btn-note me-2"
          disabled={offset === 0 ? true : false}
          onClick={() => {
            paginationCall(offset - 10);
          }}
        >
          Prev
        </button>
        <button
          className="btn btn-note"
          disabled={!hasNext}
          onClick={() => {
            paginationCall(offset + 10);
          }}
        >
          Next
        </button>
      </div>
      {modalStatus ? (
        <>
          <div className="backdrop"></div>
          <DetailModal
            id={curId}
            closeModal={() => {
              setModalStatus(false);
            }}
          />
        </>
      ) : null}
    </>
  );
}

export default Table;
