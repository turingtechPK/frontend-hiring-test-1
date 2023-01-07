import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./DetailsModal.css";
import { formatTime } from "../Table/HelperFuncs";
export const DetailsModal = ({ open, setModalOpen, selectedCall }) => {
  console.log(selectedCall);

  return (
    <Modal
      centered
      bodyStyle={{ borderRadius: 0 }}
      className="modal"
      title="Add Notes"
      style={{
        top: 20,
      }}
      open={open}
      onCancel={() => setModalOpen(false)}
    >
      <p>
        Call Type:
        <span
          style={{
            color:
              selectedCall.call_type === "answered"
                ? "#6CD8CB"
                : selectedCall.call_type === "missed"
                ? "#D3596C"
                : "#2A5DE8",
          }}
        >
          {"  " +
            selectedCall.call_type.charAt(0).toUpperCase() +
            selectedCall.call_type.slice(1)}
        </span>
      </p>
      <p>Duration {formatTime(selectedCall.duration)}</p>
      <p>From: {selectedCall.from}</p>
      <p>To: {selectedCall.to}</p>
      <p>Via: {selectedCall.via}</p>
    </Modal>
  );
};
