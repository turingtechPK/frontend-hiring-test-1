import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import "./DetailsModal.css";
import Pusher from "pusher-js";
import { formatTime } from "../Table/HelperFuncs";
import axios from "axios";
import { API_URL, PusherObj } from "../../api_url";

export const DetailsModal = ({ open, setModalOpen, selectedCall }) => {
  const { TextArea } = Input;
  const [note, setNote] = useState("");
  const onChange = (e) => {
    setNote(e.target.value);
  };
  const sendNote = () => {
    let newNote = { content: note };
    axios
      .post(`${API_URL}/calls/${selectedCall.id}/note`, newNote, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    const mypusher = new Pusher(PusherObj.APP_KEY, {
      cluster: PusherObj.APP_CLUSTER,
      authEndpoint: PusherObj.APP_AUTH_ENDPOINT,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    const channel = mypusher.subscribe("private-aircall");
    channel.bind("update-call", (res) => {
      console.log(res.notes);
    });
  }, []);

  return (
    <Modal
      closeIcon={<CloseOutlined style={{ color: "#4f46f8", fontSize: 25 }} />}
      centered
      title="Add Notes"
      footer={null}
      open={open}
      onCancel={() => setModalOpen(false)}
    >
      <p style={{ color: "#2A5DE8", fontSize: 12 }}>
        CALL ID {selectedCall?.id}
      </p>
      <Divider style={{ width: "100%" }} />
      <p className="heads">
        Call Type:
        <span
          style={{
            color:
              selectedCall?.call_type === "answered"
                ? "#6CD8CB"
                : selectedCall?.call_type === "missed"
                ? "#D3596C"
                : "#2A5DE8",
          }}
        >
          {"  " +
            selectedCall?.call_type.charAt(0).toUpperCase() +
            selectedCall?.call_type?.slice(1)}
        </span>
      </p>
      <p className="heads">Duration: {formatTime(selectedCall?.duration)}</p>
      <p className="heads">From: {selectedCall?.from}</p>
      <p className="heads">To: {selectedCall?.to}</p>
      <p className="heads">Via: {selectedCall?.via}</p>
      <p style={{ fontWeight: "bold" }} className="heads">
        Notes
      </p>
      <TextArea
        onChange={onChange}
        style={{
          height: 120,
          resize: "none",
        }}
        rows={4}
        placeholder="Add Notes"
        maxLength={4}
      />
      <Divider />
      <Button
        onClick={() => {
          sendNote();
        }}
        style={{
          borderRadius: 2,
          marginTop: "5%",
          width: "100%",
          height: "20%",
          backgroundColor: "#4f46f8",
        }}
        type="primary"
      >
        Save
      </Button>
    </Modal>
  );
};
