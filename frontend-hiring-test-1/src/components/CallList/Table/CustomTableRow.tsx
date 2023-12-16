import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
  AddNote,
} from "../CallList.style.ts";
import NoteModal from "../NoteModal.tsx";

interface CallTableProps {
  calls: CallLog[];
  selectedStatus: string;
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

interface CallRowProps {
  callLog: CallLog;
  onAddNote: (callLog: CallLog) => void;
}

const CallRow: React.FC<CallRowProps> = ({ callLog, onAddNote ,setIsModalVisible,IsModalVisible}) => {
  const [noteContent, setNoteContent] = useState("");

  const handleNoteContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteContent(e.target.value);
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

  return (
    <>
      <TableRow key={callLog.createdAt}>
        <TableData style={{ color: getRowBackgroundColor(callLog.call_type) }}>
          {callLog.call_type}
        </TableData>
        <TableData style={{ color: "#3a60e8" }}>{callLog.direction}</TableData>
        <TableData>{callLog.duration}</TableData>
        <TableData>{callLog.from}</TableData>
        <TableData>{callLog.to}</TableData>
        <TableData>{callLog.via}</TableData>
        <TableData>{callLog.created_at}</TableData>
        <TableData>
          <button
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
          <AddNote onClick={() => onAddNote(callLog)}>Add Note</AddNote>
        </TableData>
      </TableRow>

      <NoteModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAddNote={(note) => {
          // Handle note addition logic here
          setIsModalVisible(false);
        }}
        selectedCall={selectedCall}
        noteContent={noteContent}
        onNoteContentChange={handleNoteContentChange}
      />
    </>
  );
};

export default CallRow;
