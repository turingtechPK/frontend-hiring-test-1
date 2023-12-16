/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
  AddNote,
} from "../CallList.style.ts";
import axios from "axios";
import NoteModal from "../Modal/NoteModal.tsx";
import Pusher from "pusher-js";
import { APP_KEY, APP_CLUSTER } from "../../../services/pusherConfig.ts";
import { message } from "antd";

interface CallTableProps {
  calls: CallLog[];
  selectedStatus: string;
  fetchCalls: () => Promise<void>;
}

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

const CallTable: React.FC<CallTableProps> = ({
  calls,
  selectedStatus,
  fetchCalls,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [callss, setCalls] = useState("");

  const showNoteModal = (call: CallLog) => {
    if (!selectedCall || selectedCall.id !== call.id) {
      setNoteContent("");
    }
    setSelectedCall(call);
    setIsModalVisible(true);
  };

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

  const filteredCalls = calls.filter((call: any) => {
    if (selectedStatus === "All") {
      return true;
    } else if (selectedStatus === "Archived") {
      return call.is_archived;
    } else if (selectedStatus === "Unarchive") {
      return !call.is_archived;
    }
    return false;
  });
  useEffect(() => {}, [calls]);

  const handleArchiveToggle = async (call: CallLog) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.put(
        `https://frontend-test-api.aircall.dev/calls/${call.id}/archive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const updatedCalls = calls.map((c) =>
        c.id === call.id ? { ...c, is_archived: !c.is_archived } : c
      );

      setCalls(updatedCalls);

      const pusher = new Pusher(APP_KEY, {
        cluster: APP_CLUSTER,
        authEndpoint: "https://frontend-test-api.aircall.dev/pusher/auth",
        auth: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      const channel = pusher.subscribe("private-aircall");

      channel.trigger("client-update-call", {
        callId: call.id,
        is_archived: !call.is_archived,
      });

      pusher.unsubscribe("private-aircall");

      await fetchCalls();

      message.success(
        `Call ${call.is_archived ? "Unarchive" : "Archived"} successfully!`
      );
    } catch (error) {
      console.error("Error toggling archive status:", error);
      message.success(
        `Call ${call.is_archived ? "Unarchive" : "Archived"} successfully!`
      );
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <th>Call Type</th>
          <th>Direction</th>
          <th>Duration</th>
          <th>From</th>
          <th>To</th>
          <th>Via</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Actions</th>
        </TableRow>
      </TableHead>
      <TableBody>
        {calls.map((callLog) => (
          <TableRow key={callLog.createdAt}>
            <TableData
              style={{ color: getRowBackgroundColor(callLog.call_type) }}
            >
              {callLog.call_type}
            </TableData>
            <TableData style={{ color: "#3a60e8" }}>
              {callLog.direction}
            </TableData>
            <TableData>{callLog.duration}</TableData>
            <TableData>{callLog.from}</TableData>
            <TableData>{callLog.to}</TableData>
            <TableData>{callLog.via}</TableData>
            <TableData>{callLog.created_at}</TableData>
            <TableData>
              <button
                onClick={() => handleArchiveToggle(callLog)}
                style={{
                  padding: "8px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  display: "inline-block",
                  borderRadius: "2px",
                  background: callLog.is_archived ? "#edfbfa" : "#eeeeee",
                  color: callLog.is_archived ? "#36cfbf" : "#777777",
                }}
              >
                {callLog.is_archived ? "Archive" : "Unarchive"}
              </button>
            </TableData>
            <TableData>
              <AddNote onClick={() => showNoteModal(callLog)}>Add Note</AddNote>
            </TableData>
          </TableRow>
        ))}
      </TableBody>

      <NoteModal
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onCancel={() => setIsModalVisible(false)}
        selectedCall={selectedCall}
      />
    </Table>
  );
};

export default CallTable;
