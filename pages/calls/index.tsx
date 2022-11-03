
import Banner from "../../Modules/Banner";
import TableComponent from "../../Modules/TableComponent";

import styles from "../../styles/Main.module.css";
import { useState, useEffect } from "react";
import { Input } from 'antd';
import { formatDuration } from "../../services/date-formatter";
import { call } from "../../Interfaces/calls";
import URLS from "../../config.json";
import axios from "axios";
import { getCookie,setCookie } from "cookies-next";
import { note } from "../../Interfaces/note";
import { Dropdown, Menu, Space, Typography, Modal, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getCookies } from "cookies-next";
import cookies from "next-cookies"
const Calls = (props) => {
  const [filterBy, setFilterBy] = useState("");
  const [note, setNote] = useState("");
  const [calls, setCalls] = useState(props.data.calls);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState<call>({});
  const [totalCalls, setTotalCalls] = useState(props.data.totalCalls);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isOpenAddNotesModal, setIsOpenAddNotesModal] = useState(false);
  const [isSuccessAddingNote, setIsSuccessAddingNote] = useState(false);

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
    const access_token = getCookie('access_token')
    axios
      .get(URLS.baseURL + URLS.getCallsURL + `?offset=${page}&limit=${10}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
    const access_token = getCookie('access_token')
    axios
      .post(
        URLS.baseURL + URLS.getCallsURL + `/${selectedCall.id}` + URLS.postNoteURL,
        { content: note },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => {
        setIsSuccessAddingNote(true);
        message.success("Notes are successfully added");
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
          <div className={styles.filterByText}>Filter By: </div>
        
          <Dropdown overlay={menu}>
            <Typography.Link>
              <Space className={styles.filterByDropDown}>
                Status
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
          title={<><div className={styles.addNotesText}>Add Notes</div><div className={styles.selectedCallID}>Call ID {selectedCall.id}</div></>}
          open={isOpenAddNotesModal}
         
          onCancel={()=>{setIsOpenAddNotesModal(false)}}
          footer={<div onClick={() => {
            setIsOpenAddNotesModal(false);
            handlePostNote();
          }} className={styles.extendedBtn}>Save</div>}
        >
          
          <>
            <div className={styles.dialogRow}>
              <div >Call Type</div>
              <div style={{textTransform:"capitalize"}}>{selectedCall.call_type}</div>
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

            <div className={styles.dialogRowNotes}>Notes</div>

            {selectedCall.notes?.map((note: note) => {
              return (
                <div className={styles.dialogRowNotes} key={note.id}>
                  {note.content}
                </div>
              );
            })}

            <div className={styles.dialogRowNotes}>
            <Input.TextArea   
              placeholder="Please enter any notes"
              autoSize={{ minRows: 5, maxRows: 6 }}
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

export async function getServerSideProps(context) {
  
  const {access_token}=cookies(context)
  
  let data={}
  await axios
  .get(URLS.baseURL + URLS.getCallsURL, {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  }).then((res)=>{
    data={
      calls:res.data.nodes,
      totalCount:res.data.totalCount,
      hasNextPage:res.data.hasNextPage
    }
  })
  .catch((e)=>{
    console.log("return",e.response)
  })
 if(data)
 console.log('data successfully returned at build time')
  return {
    props: {data}, // will be passed to the page component as props
  }
}

export default Calls;
