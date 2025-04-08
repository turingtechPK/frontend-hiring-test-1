import React from "react";
import { Button, TableRow, TableCell } from "@mui/material";

interface CallRowProps {
    call: any;
    onArchive: (id: string) => void;
    onAddNote: (call: any) => void;
    onRowSelection: (id: string) => void;
    isSelected: boolean;  
    classes: {
      addNoteBtn: string;
    };
  }
  

  const CallRow: React.FC<CallRowProps> = ({
    call,
    onArchive,
    onAddNote,
    onRowSelection,
    isSelected,  
    classes,
  }) => {
    return (
      <TableRow
        key={call.id}
        selected={isSelected}  
        onClick={() => onRowSelection(call.id)} 
        sx={{
          backgroundColor: isSelected ? '#f0f8ff' : 'inherit',
        }}
      >
        <TableCell>{call.call_type}</TableCell>
        <TableCell>{call.direction}</TableCell>
        <TableCell>
          {Math.floor(call.duration / 60)} min {call.duration % 60} sec
        </TableCell>
        <TableCell>{call.from}</TableCell>
        <TableCell>{call.to}</TableCell>
        <TableCell>{new Date(call.created_at).toLocaleString()}</TableCell>
  
        <TableCell>
          <Button
            variant="contained"
            sx={{
              backgroundColor: call.is_archived ? "#bdbdbd" : "#7ec8c5",
              border: "none",
              width: "100px",
            }}
            onClick={() => onArchive(call.id)}
          >
            {call.is_archived ? "Unarchive" : "Archive"}
          </Button>
        </TableCell>
  
        <TableCell>
          <Button
            variant="contained"
            className={classes.addNoteBtn}
            onClick={() => onAddNote(call)}
          >
            Add Note
          </Button>
        </TableCell>
      </TableRow>
    );
  };
  
  export default CallRow;
  

