import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

const CallDetailModal = ({ detail }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [archiveCall, setArchiveCall] = useState(Boolean);

  //   useEffect(() => {}, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const archiveStatus = () => {
    // setArchiveCall(true);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Show Details
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p> Id: {detail.id}</p>
        <p>duration: {detail.duration}</p>
        <p>
          is_archived:
          {/* {detail.is_archived ? "True" : "False"}{" "} */}
          <Button className="archive-btn" onClick={archiveStatus()}>
            Archive
          </Button>
        </p>
        <p>from: {detail.from}</p>
        <p>to: {detail.to}</p>
        <p>direction: {detail.direction}</p>
        <p>call_type: {detail.call_type}</p>
        <p>via: {detail.via}</p>
        <p>created_at: {detail.created_at}</p>
        <p>
          notes:{" "}
          {detail.notes.map((data) => (
            <>
              <li>{data.content}</li>
            </>
          ))}
        </p>
      </Modal>
    </div>
  );
};

export default CallDetailModal;
