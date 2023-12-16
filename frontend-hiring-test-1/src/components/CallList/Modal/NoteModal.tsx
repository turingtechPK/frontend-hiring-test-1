/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Modal, Button, Input, message } from "antd";
import axios from "axios";
import Pusher from "pusher-js";
import { APP_KEY, APP_CLUSTER } from "../../../services/pusherConfig.ts";

interface CallLog {
  id: string;
  call_type: string;
  direction: string;
  duration: number;
  from: string;
  to: string;
  via: string;
  created_at: string;
  is_archived: boolean;
}
interface NoteModalProps {
  isVisible: boolean;
  setIsModalVisible: boolean;
  onCancel: () => void;
  onAddNote: (noteContent: string) => void;
  selectedCall: CallLog | null;
  noteContent: string;
  onNoteContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  isVisible,
  setIsModalVisible,
  onCancel,
  onAddNote,
  selectedCall,
  noteContent,
  onNoteContentChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedCall, setFetchedCall] = useState<CallLog | null>(null);

 
  useEffect(() => {
    const fetchData = async () => {
      if (isVisible && selectedCall) {
        setLoading(true);
        setError(null);

        try {
          const accessToken = localStorage.getItem("accessToken");

          const response = await axios.get(
            `https://frontend-test-api.aircall.dev/calls/${selectedCall.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setFetchedCall(response.data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setError("Unauthorized: Please reauthenticate.");
          } else {
            setError(`Error fetching call details: ${error.message}`);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [isVisible, selectedCall]);

  const getRowBackgroundColor = (callType: string) => {
    switch (callType) {
      case "voicemail":
        return "#496cea";
      case "missed":
        return "#c91d3e";
      case "answered":
        return "#27cbba";
      default:
        return "inherit";
    }
  };
  return (
    <Modal
      title={`Add Notes`}
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="addNote" type="primary" >
          Save
        </Button>,
      ]}
      bodyStyle={{ maxHeight: "550px", overflowY: "auto" }}
    >
      <div>
        <p style={{ color: "#496cea", marginTop: "-2px" }}>
          Call ID {selectedCall?.id}
        </p>
        <div
          style={{
            width: "100%",
            background: "#eaebed",
            borderBottom: "2px solid #eaebed",
          }}
        ></div>
        {selectedCall && (
          <>
            <p>
              <strong>Call Type:</strong>{" "}
              <span
                style={{
                  color: getRowBackgroundColor(selectedCall.call_type),
                }}
              >
                {selectedCall.call_type}
              </span>
            </p>
            <p>
              <strong>Direction:</strong> {selectedCall.direction}
            </p>
            <p>
              <strong>Duration:</strong> {selectedCall.duration} seconds
            </p>
            <p>
              <strong>From:</strong> {selectedCall.from}
            </p>
            <p>
              <strong>To:</strong> {selectedCall.to}
            </p>
            <p>
              <strong>Via:</strong> {selectedCall.via}
            </p>
            <p>
              <strong>Created At:</strong> {selectedCall.created_at}
            </p>
          </>
        )}
        <Input
          placeholder="Type your note here"
          value={noteContent}
          onChange={onNoteContentChange}
          style={{ height: "100px", marginTop: "10px" }}
        />
      </div>
    </Modal>
  );
};

export default NoteModal;
