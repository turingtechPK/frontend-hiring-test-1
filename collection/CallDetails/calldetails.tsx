import {
  Table,
  Tag,
  Button,
  Modal,
  Input,
  Switch,
} from "../../libs/shared-components";
import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";
import { archivechange, addnote, fetchMyAPI } from "../../pages/api/api";
import NewModal from "../Modal/modal";
const { TextArea } = Input;
const { Column } = Table;

const CallsTable = () => {
  const [data, setdata] = useState("true");
  const [Item, setItem] = useState("");
  const [modaldata, setmodaldata] = useState([]);
  const [newNote, setnewNote] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);

    const itemvalue = fetchMyAPI().then((d) => {
      setItem(d);
    });
    setloading(false);
  }, [data]);

  ////////////////////////for showing modal////////////////////////////////////
  const showModal = (record: any) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };
  ///////////////////////////for adding the note in call/////////////////////////
  const handleOk = async (e: React.FormEvent<HTMLInputElement>) => {
    let payload = { id: Math.random(), content: newNote };
    modaldata.notes.push(payload);
    const res = await addnote(e, newNote);
    console.log(newNote);

    setnewNote("");
  };
  ///////////////////////////for changing the archive status////////////////////
  const handleArchiveChange = async (e: React.FormEvent<HTMLInputElement>) => {
    setloading(true);
    const res: any = await archivechange(e);
    setdata(JSON.stringify(res.is_archived));
    setloading(false);
    const itemvalue = fetchMyAPI().then((d) => {
      setItem(d);
    });
  };

  ///////////////////////for closing the modal////////////////////////////////
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Table dataSource={Item} pagination={{ pageSize: 5 }} loading={loading}>
        <Column title="TO" dataIndex="to" key="id" />

        <Column title="FROM" dataIndex="from" key="id" />
        <Column title="DIRECTION" dataIndex="direction" key="id" />
        <Column
          title="CALL TYPE"
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
          title="CREATED AT"
          dataIndex="created_at"
          key="id"
          sorter={(a, b) => a.created_at < b.created_at}
        />
        <Column
          title="STATUS"
          dataIndex="is_archived"
          render={(index, record) => (
            <h1
              type="button"
              onClick={() => handleArchiveChange(record.id)}
            >
              {/* {String(record.is_archived) === data
                ? data
                : String(record.is_archived)} */}

              {record.is_archived ? (
                <Tag color="red">{"Archived"}</Tag>
              ) : (
                <Tag color="green">{"Unarchive"}</Tag>
              )}
            </h1>
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
      <NewModal
        visible={isModalVisible}
        onCancel={handleCancel}
        newNote={newNote}
        onOk={handleOk}
        setnewNote={setnewNote}
        modaldata={modaldata}
        loading={loading}
      />
    </>
  );
};
export default CallsTable;
