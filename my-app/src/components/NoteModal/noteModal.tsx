import React from "react";
import { TextField, Button } from "@mui/material";
import styles from "./NoteModal.module.scss";
import GenericModal from "../Modals/modal";

interface NoteModalProps {
    isOpen: boolean;
    selectedCall: any;
    note: string;
    onChange: (note: string) => void;
    onClose: () => void;
    onSave: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
    isOpen,
    selectedCall,
    note,
    onChange,
    onClose,
    onSave,
}) => (
    <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        title="Add Note"
        subHeading={selectedCall?.id}
    >
        <p><strong>From:</strong> {selectedCall?.from}</p>
        <p><strong>To:</strong> {selectedCall?.to}</p>
        <p><strong>Duration:</strong> {selectedCall?.duration} sec</p>
        <p><strong>Created At:</strong> {new Date(selectedCall?.created_at).toLocaleString()}</p>
        <div className={styles.notesSection}>
            <strong>Notes:</strong>
            {selectedCall?.notes && selectedCall.notes.length > 0 ? (
                <div className={styles.notesGrid}>
                    {selectedCall.notes.map((note: any, index: number) => (
                        <div key={note.id || index} className={styles.noteCard}>
                            {note.content}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No notes available.</p>
            )}
        </div>

        <TextField
            label="Add Notes"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={note}
            onChange={(e) => onChange(e.target.value)}
        />

        <div className={styles.modalActions}>
            <Button variant="contained" color="primary" onClick={onSave}>
                Save
            </Button>
        </div>
    </GenericModal>
);

export default NoteModal;
