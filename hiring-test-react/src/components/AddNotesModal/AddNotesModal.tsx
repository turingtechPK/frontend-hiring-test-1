import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Row } from "../../types";
import InputField from "../InputField";

interface AddNotesModalProps {
  open: boolean;
  onClose: () => void;
  selectedRow: Row | null;
}

const AddNotesModal: React.FC<AddNotesModalProps> = ({
  open,
  onClose,
  selectedRow,
}) => {
  const [notes, setNotes] = useState("");
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 650,
          bgcolor: "#fff",
          borderRadius: "6px",
        }}
      >
        <div
          id="header"
          className="p-4 flex justify-between border-b border-gray-300"
        >
          <div className="flex flex-col">
            <Typography>Add Notes</Typography>
            <Typography>Call ID</Typography>
          </div>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        <div id="body" className="p-4 mt-4 border-b border-gray-300">
          <div className="flex gap-2">
            <Typography>Call Type</Typography>
            <Typography>{selectedRow?.callType}</Typography>
          </div>
          <div className="flex gap-2">
            <Typography>Duration</Typography>
            <Typography>{selectedRow?.duration}</Typography>
          </div>
          <div className="flex gap-2">
            <Typography>From</Typography>
            <Typography>{selectedRow?.from}</Typography>
          </div>
          <div className="flex gap-2">
            <Typography>To</Typography>
            <Typography>{selectedRow?.to}</Typography>
          </div>
          <div className="flex gap-2">
            <Typography>Via</Typography>
            <Typography>{selectedRow?.via}</Typography>
          </div>
          <div className="mt-2">
            <InputField
              name="notes"
              placeholder="Add Notes"
              fullWidth={true}
              type="text"
              multiline={true}
              minRows={4}
              label="Notes"
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* api call to save note */}
        <div className="w-full mt-6">
          <Button>Save</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddNotesModal;
