import Banner from "../Modules/Banner";
import TableComponent from "../Modules/TableComponent";

import styles from "../styles/Main.module.css";
import { useState, useEffect } from "react";

import { formatDuration } from "../services/date-formatter";
import { call } from "../Interfaces/calls";
import {
  baseURL,
  getCallsURL,
  postNoteURL,
  refreshTokenURL,
} from "../config.json";
import axios from "axios";
import { note } from "../Interfaces/note";
import { Dropdown, Menu, Space, Typography, Modal, message } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Calls = () => {
  const [filterBy, setFilterBy] = useState("");
  const [note, setNote] = useState("");
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState<call>({});
  const [totalCalls, setTotalCalls] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isOpenAddNotesModal, setIsOpenAddNotesModal] = useState(false);
  const [isSuccessAddingNote, setIsSuccessAddingNote] = useState(false);

  const getCalls = () => {
    axios
      .get(baseURL + getCallsURL, {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setCalls(res.data.nodes);
        setTotalCalls(res.data.totalCount);
        setHasNextPage(res.data.hasNextPage);
      });
  };

  useEffect(() => {
    getCalls();
  }, []);

  useEffect(() => {
    if (filterBy !== "" && filterBy === "archived") {
      setFilteredCalls(calls.filter((call: call) => call.is_archived === true));
    } else if (filterBy !== "" && filterBy !== "archived") {
      setFilteredCalls(
        calls.filter((call: call) => call.is_archived === false)
      );
    } else {
      setFilteredCalls(calls);
    }
  }, [filterBy]);

  const handlePaginationChange = (page: number) => {
    axios
      .get(baseURL + getCallsURL + `?offset=${page}&limit=${10}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (filterBy !== "" && filterBy === "archived") {
          setFilteredCalls(
            res.data.nodes.filter((call: call) => call.is_archived === true)
          );
        } else if (filterBy !== "" && filterBy !== "archived") {
          setFilteredCalls(
            res.data.nodes.filter((call: call) => call.is_archived === false)
          );
        } else {
          setFilteredCalls(res.data.nodes);
        }
        setTotalCalls(res.data.totalCount);
        setHasNextPage(res.data.hasNextPage);
      });
  };
  const handleAddNote = (selectedID: string) => {
    setSelectedCall(
      filteredCalls.filter((call: call) => call.id === selectedID)[0]
    );

    setIsOpenAddNotesModal(true);
  };
  const handlePostNote = () => {
    axios
      .post(
        baseURL + getCallsURL + `/${selectedCall.id}` + postNoteURL,
        { content: note },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setIsSuccessAddingNote(true);
        message.success("Posting Notes Success");
        const indexCalls = calls.findIndex(
          (call: call) => call.id === res.data.id
        );
        const indexCallsFiltered = filteredCalls.findIndex(
          (call: call) => call.id === res.data.id
        );
        let newCalls: call[] = calls;
        let newFilteredCalls: call[] = filteredCalls;
        newCalls[indexCalls] = res.data;
        newFilteredCalls[indexCallsFiltered] = res.data;
        setCalls(newCalls);
        setFilteredCalls(newFilteredCalls);
        setNote("");
      });
  };

  const menu = (
    <Menu
      selectable
      items={[
        {
          key: "",
          label: "All",
        },
        {
          key: "archived",
          label: "Archived",
        },
        {
          key: "unArchived",
          label: "Un Archived",
        },
      ]}
      onSelect={(data) => {
        setFilterBy(data.key);
      }}
    />
  );

  return (
    <>
      <Banner />
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.header}>Turing Technologies Frontend Test</div>
        </div>
        <div className={styles.rowFlex}>
          <Dropdown overlay={menu}>
            <Typography.Link>
              <Space>
                Filter By
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
        </div>

        <div className={styles.row}>
          <TableComponent
            calls={filteredCalls}
            totalCalls={totalCalls}
            hasNextPage={hasNextPage}
            handlePaginationChange={handlePaginationChange}
            handleAddNote={handleAddNote}
          />
        </div>

        <Modal
          title="Add Notes"
          open={isOpenAddNotesModal}
          onOk={() => {
            setIsOpenAddNotesModal(false);
            handlePostNote();
          }}
          onCancel={() => {
            setIsOpenAddNotesModal(false);
          }}
        >
          <div className={styles.blueText}>Call ID {selectedCall.id}</div>
          <>
            <div className={styles.dialogRow}>
              <div>Call Type</div>
              <div>{selectedCall.call_type}</div>
            </div>
            <div className={styles.dialogRow}>
              <div>Duration</div>
              <div>{formatDuration(selectedCall.duration)}</div>
            </div>
            <div className={styles.dialogRow}>
              {" "}
              <div>From</div>
              <div>{selectedCall.from}</div>
            </div>
            <div className={styles.dialogRow}>
              <div> To </div>
              <div>{selectedCall.to}</div>
            </div>
            <div className={styles.dialogRow}>
              {" "}
              <div> Via </div>
              <div>{selectedCall.via}</div>
            </div>

            <div className={styles.dialogRow}>Notes</div>

            {selectedCall.notes?.map((note: note) => {
              return (
                <div className={styles.dialogRow} key={note.id}>
                  {note.content}
                </div>
              );
            })}

            <div className={styles.dialogRow}>
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            </div>
          </>
        </Modal>
      </div>
    </>
  );
};

export default Calls;
