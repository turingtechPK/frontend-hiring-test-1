import { Table, Tag, Button, Modal, Input, Switch } from "antd";
import { useRouter } from "next/router";
import React, { useState, useCallback,useEffect } from "react";
import { archivechange, addnote, fetchMyAPI } from "../../pages/api/api";
const { TextArea } = Input;
const { Column } = Table;

const CallsTable = (params) => {
  const [data, setdata] = useState("true");
  const [Item, setItem] = useState('')
  const [modaldata, setmodaldata] = useState([]);
  const [newNote, setnewNote] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const token = JSON.parse(localStorage.getItem("token"));
    const itemvalue = fetchMyAPI().then((d) => {
      setItem(d);
    });
    setloading(false);
  }, [data]);

  ////////////////////////for showing modal////////////////////////////////////
  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };
///////////////////////////for adding the note in call/////////////////////////
  const handleOk = async (e) => {
    setloading(true);
    let payload = { id: Math.random(), content: newNote };
    modaldata.notes.push(payload);
    const res = await addnote(e, newNote);
    console.log(newNote);
    setTimeout(() => {
      setloading(false);
    }, 100);
    setnewNote("");
  };
///////////////////////////for changing the archive status////////////////////
  const handleArchiveChange = async (e) => {
    setloading(true)
    const res = await archivechange(e);
    setdata(JSON.stringify(res.is_archived))
    setloading(false)
    const itemvalue = fetchMyAPI().then((d) => {
      setItem(d);
    });
  };

  ///////////////////////for closing the modal////////////////////////////////
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return loading ? (
    <div>LOADING</div>
  ) : (
    <>
      <Table dataSource={Item} pagination={{ pageSize: 5 }}>
        <Column title="To" dataIndex="to" key="id" />

        <Column title="From" dataIndex="from" key="id" />
        <Column title="Direction" dataIndex="direction" key="id" />
        <Column
          title="Call Type"
          dataIndex="call_type"
          render={(call_type) => {
            let color = call_type === "missed" ? "red" : "green";
            if (call_type === "voicemail") {
              color = "yellow";
            }
            return (
              <Tag color={color} key={call_type}>
                {call_type.toUpperCase()}
              </Tag>
            );
          }}
          key="id"
          filters={[
            {
              text: "missed",
              value: "missed",
            },
            {
              text: "voicemail",
              value: "voicemail",
            },
            {
              text: "answered",
              value: "answered",
            },
          ]}
          onFilter={(value, record) => record.call_type.startsWith(value)}
        />
        <Column
          title="created_at"
          dataIndex="created_at"
          key="id"
          sorter={(a, b) => a.created_at < b.created_at}
        />
        <Column
          title="is_archived"
          dataIndex="is_archived"
          render={(index, record) => (
            <Button type="primary" onClick={() => handleArchiveChange(record.id)}>
          {String(record.is_archived)===data? data:String(record.is_archived)}
        </Button>
          )}
          key="id"
        />
        <Column
          title="ACTIONS"
          dataIndex="is_archived"
          key="id"
          render={(index, record) => (
            <Button type="primary" onClick={() => showModal(record)}>
              View
            </Button>
          )}
        />
      </Table>
      ,
      <Modal
        title="Details"
        visible={isModalVisible}
        onOk={() => handleOk(modaldata.id)}
        onCancel={handleCancel}
      >
        <p>Id: {modaldata.id}</p>
        <p>Created at: {modaldata.created_at}</p>
        <p>call_types: {modaldata.call_type}</p>
        <p>Notes:</p>
        {modaldata.notes && modaldata.notes.length !== 0 ? (
          modaldata.notes.map((e) => <p> {e.content}</p>)
        ) : (
          <p>no data</p>
        )}
        <TextArea
          rows={4}
          placeholder="Add Notes"
          value={newNote}
          onChange={(e) => setnewNote(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default CallsTable;
