import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { archiveCall, getData, getPaginationData } from "../utilities/api";
import DetailModal from "./modal";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

function Table() {
  const [callsData, setCallsData] = useState([]);
  const [callsDataFiltered, setCallsDataFiltered] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [curRow, setCurRow] = useState({});
  const [reloadRes, setReloadRes] = useState(false);
  const [filter, setFilter] = useState("all");
  const [archiveData, setarchiveData] = useState({});

  const setFIlterData = (filterValue: string) => {
    if (filterValue === "all") {
      setCallsDataFiltered(callsData);
    } else if (filterValue === "archived") {
      setCallsDataFiltered(
        callsData.filter((item: any) => item.is_archived === true)
      );
    } else if (filterValue === "unarchived") {
      setCallsDataFiltered(
        callsData.filter((item: any) => item.is_archived === false)
      );
    }
  };

  useEffect(() => {
    const retreiveData = async () => {
      var res = await getData();
      await setCallsData(res.data.nodes);
      setCallsDataFiltered(res.data.nodes);
      setOffset(0);
    };
    retreiveData();
  }, [reloadRes, archiveData]);
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
      sort: true,
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
          <>
            <button
              className="btn btn-note mb-2"
              onClick={() => {
                setModalStatus(true);
                setCurRow(row);
              }}
            >
              Add Note
            </button>
            <button
              className="btn btn-note"
              onClick={async () => {
                const res = await archiveCall(row.id);
                setarchiveData(res.data);
              }}
            >
              Archive
            </button>
          </>
        );
      },
    },
  ];
  const paginationCall = async (offset: number) => {
    const res = await getPaginationData(offset);
    setCallsData(res.data.nodes);
    setFilter("all");
    setCallsDataFiltered(res.data.nodes);
    setOffset(offset);
    setHasNext(res.data.hasNextPage);
  };
  return (
    <>
      <div className="heading">
        <h3 className="mb-4 mt-4">Turing Technoloogies Frontend Test</h3>
        <div>
          <label htmlFor="filter">Filter by: </label>

          <select
            id="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setFIlterData(e.target.value);
            }}
          >
            <option value="all" selected>
              All
            </option>
            <option value="archived">Archived</option>
            <option value="unarchived">Unarchived</option>
          </select>
        </div>
      </div>
      <BootstrapTable
        keyField="id"
        data={callsDataFiltered}
        columns={columns}
      />
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
            row={curRow}
            setReloadRes={setReloadRes}
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
