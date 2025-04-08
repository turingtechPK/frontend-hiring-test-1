import React from "react";
import { TableRow, TableCell } from "@mui/material";
import CallRow from "../CallRow/callRow";

interface CallGroupProps {
  groupKey: string;
  groupBy: string;
  calls: any[];
  onArchive: (id: string) => void;
  onAddNote: (call: any) => void;
  onRowSelection: (id: string) => void; 
  isSelected: boolean;
  classes: {
    groupRow: string;
    groupHeader: string;
    addNoteBtn: string;
  };
}
const CallGroup: React.FC<CallGroupProps> = ({
    groupKey,
    groupBy,
    calls,
    onArchive,
    onAddNote,
    onRowSelection,
    isSelected,
    classes,
  }) => (
    <>
      <TableRow className={classes.groupRow}>
        <TableCell colSpan={8} className={classes.groupHeader}>
          <strong>{groupBy ? `${groupBy.toUpperCase()}: ${groupKey}` : groupKey}</strong>
        </TableCell>
      </TableRow>
      {calls.map((call) => (
        <CallRow
          key={call.id}
          call={call}
          onArchive={onArchive}
          onAddNote={onAddNote}
          onRowSelection={onRowSelection}
          isSelected={isSelected}  
          classes={classes}
        />
      ))}
    </>
  );
  
  export default CallGroup;
