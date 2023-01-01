import React from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
const { TextArea } = Input;

const APP_AUTH_ENDPOINT = "https://frontend-test-api.aircall.io/pusher/auth";
const APP_KEY = "d44e3d910d38a928e0be";
const APP_CLUSTER = "eu";

const NotesModal = ({ closeModal, modalData }) => {
  const [modal2Open, setModal2Open] = React.useState(true);
  const [notes, setNotes] = React.useState("");
  const [newNotes, setNewNotes] = React.useState("");

  React.useEffect(() => {
    console.log("NOTES: ", modalData.notes);
    // Initialize Pusher
    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER,
      authEndpoint: APP_AUTH_ENDPOINT,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      },
    });

    const channel = pusher.subscribe("private-aircall");

    channel.bind("update-call", (data) => {
      console.log("Received update-call event:", data);
      console.log("NOTES: ", data.notes);
      setNewNotes([...modalData.notes, ...data.notes]);
    });
  }, []);

  const addNotes = () => {
    axios
      .post(
        `https://frontend-test-api.aircall.io/calls/${modalData.id}/note`,
        {
          content: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((response) => {
        console.log("notes data: ", response.data);
        // setNotes("")
        // closeModal();
      });
  };
  const getTimeInMinutes = (time) => {
    const minutes = Math.floor(time / 60);

    const seconds = time % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  const capitalize = (str) => {
    let letter = str.charAt(0).toUpperCase();
    return letter + str.slice(1);
  };
  return (
    <>
      <Modal
        title={
          <div>
            <h4>Add Notes</h4>
            <h5 style={{ color: "#4F46F8" }}>Call ID {modalData.id}</h5>
            <hr></hr>
          </div>
        }
        centered
        open={modal2Open}
        closeIcon={
          <CloseOutlined
            style={{ color: "#4F46F8" }}
            onClick={() => closeModal()}
          />
        }
        // footer={null}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <h4>Call Type </h4>
            <h4>Duration </h4>
            <h4>From </h4>
            <h4>To </h4>
            <h4>Via </h4>
          </div>
          <div style={{ marginLeft: "2em" }}>
            <h4>
              {modalData.call_type === "missed" ? (
                <span span style={{ color: "red" }}>
                  {capitalize(modalData.call_type)}
                </span>
              ) : modalData.call_type === "voicemail" ? (
                <span style={{ color: "#4F46F8" }}>
                  {capitalize(modalData.call_type)}
                </span>
              ) : (
                <span style={{ color: "cyan" }}>
                  {capitalize(modalData.call_type)}
                </span>
              )}
            </h4>
            <h4>{getTimeInMinutes(modalData.duration)}</h4>
            <h4>{modalData.from}</h4>
            <h4>{modalData.to}</h4>
            <h4>{modalData.via}</h4>
          </div>
        </div>
        <h4>Notes</h4>
        <TextArea
          rows={5}
          placeholder="Add Notes"
          value={newNotes ? newNotes.map((n) => n.content) : notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <hr></hr>
        <Button
          type="primary"
          block
          style={{ backgroundColor: "#4F46F8", marginTop: "1em" }}
          onClick={() => addNotes()}
        >
          Save
        </Button>
      </Modal>
    </>
  );
};

export default NotesModal;
