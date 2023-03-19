import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Box,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { toggleArchive } from "@/api/routes";
import  {NoteDialog}  from "./NoteDialog";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    tableHeadCell: {
      fontSize: "12px",
      fontWeight: "700",
      border: "none",
      backgroundColor: "#F4F4F9",
      padding: "10px 16px",
    },
    tableBodyCell: {
      padding: "12px 16px",
    },
    tableCellRow: {
      fontSize: "12px",
      padding: "10px 16px",
    },
    addButton: {
      color: "white",
      backgroundColor: "#514EF4",
      border: "none",
      padding: "3px 12px",
      borderRadius: "2px",
      textTransform: "none",
      fontSize: "0.8rem",
      fontWeight: "300",
      "&:hover": {
        backgroundColor: "rgba(81, 78, 244, 0.8)",
        cursor: "pointer",
      },
    },
  }));

  function CallRow ({row}) {
    const classes = useStyles();
    const [newRow, setNewRow] = useState(row);
    const [isAddNoteOpen, setAddNoteOpen] = useState(false);
    const minutes = Math.floor(row.duration / 60);
    const seconds = row.duration - minutes * 60;
    const handleAddNote = () => {
      setAddNoteOpen(true);
    };
    const handleToggleArchive = async (id) => {
      try {
        const resp = await toggleArchive(id);
        setNewRow(resp || row);
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <TableRow>
        <TableCell sx={classes.tableBodyCell}>
          <Typography
            sx={{
              fontSize: "inherit",
              color:
                newRow.call_type === "voicemail"
                  ? "#4F46F8"
                  : newRow.call_type === "missed"
                  ? "#C91D3E"
                  : "#23CAB8",
            }}
          >
            {newRow.call_type === "voicemail"
              ? "Voice Mail"
              : newRow.call_type === "missed"
              ? "Missed"
              : "Answered"}
          </Typography>
        </TableCell>
        <TableCell sx={classes.tableBodyCell}>
          {" "}
          <Typography
            sx={{
              fontSize: "inherit",
              color: "#4F46F8",
              textTransform: "capitalize",
            }}
          >
            {newRow.direction}
          </Typography>
        </TableCell>
        <TableCell sx={classes.tableBodyCell}>
          <Typography fontSize={"inherit"}>
            {minutes} minutes {seconds} seconds
          </Typography>
          <Typography fontSize={"inherit"} color="#4F46F8">
            ({newRow.duration} seconds){" "}
          </Typography>
        </TableCell>
        <TableCell sx={classes.tableBodyCell}>{newRow.from}</TableCell>
        <TableCell sx={classes.tableBodyCell}>{newRow.to}</TableCell>
        <TableCell sx={classes.tableBodyCell}>{newRow.via}</TableCell>
        <TableCell sx={classes.tableBodyCell}>
          {newRow.created_at.substring(0, 10)}
        </TableCell>
        <TableCell sx={classes.tableBodyCell}>
          <Tag
            key={newRow.id}
            is_archived={newRow.is_archived}
            handleToggleArchive={handleToggleArchive}
            id={newRow.id}
          />
        </TableCell>
  
        <TableCell sx={classes.tableBodyCell}>
          <Button
          className={classes.addButton}
            onClick={handleAddNote}>
            Add Note
          </Button>
          <NoteDialog
            open={isAddNoteOpen}
            setOpen={setAddNoteOpen}
            callID={newRow.id}
          />
        </TableCell>
      </TableRow>
    );
  };

  const Tag = ({ id, is_archived, handleToggleArchive }) => {
    return (
      <Box
        sx={{
          backgroundColor: is_archived ? "#EDFBFA" : "#EEEEEE",
          color: is_archived ? "#20C9B8" : "#7C7C7C",
  
          textAlign: "center",
          width: "90px",
          padding: "5px 2px",
          borderRadius: "2px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => handleToggleArchive(id)}
      >
        {" "}
        {is_archived ? "Archived" : "Unarchived"}
      </Box>
    );
  };
  
export default CallRow;