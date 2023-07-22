import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { styles } from "./style"
import { formatTime } from "../DurationCell"
import { useState } from "react"
import { saveNote } from "../../utils/API"

const CallModal = ({open, setOpen, selectedCall}) => {
    const [note, setNote] = useState('')
    const handleNoteSubmit = async () => {
        await saveNote(selectedCall?.id, note)
        setNote('')
        setOpen(false)
    }
    return (
        <Modal sx={styles.modalMain} open={open}>
            <Box sx={styles.mainBox}>
                <Box sx={styles.ModalHeader}>
                    <Box>
                        <Typography sx={styles.title}>Add Notes</Typography>
                        <Typography sx={styles.callId}>Call ID {selectedCall?.id}</Typography>
                    </Box>
                    <Button onClick={() => setOpen(false)}>X</Button>
                </Box>
                <Box sx={styles.ModalBody}>
                    <Box sx={styles.detailsContainer}>
                        <Box sx={styles.leftBox}>
                            <Typography sx={styles.subTitle}>Call Type</Typography>
                            <Typography sx={styles.subTitle}>Duration</Typography>
                            <Typography sx={styles.subTitle}>From</Typography>
                            <Typography sx={styles.subTitle}>To</Typography>
                            <Typography sx={styles.subTitle}>Via</Typography>
                        </Box>
                        <Box sx={styles.rightBox}>
                            <Typography sx={styles.callType}>{selectedCall?.call_type}</Typography>
                            <Typography sx={styles.modalText}>{formatTime(selectedCall?.duration)}</Typography>
                            <Typography sx={styles.modalText}>{selectedCall?.from}</Typography>
                            <Typography sx={styles.modalText}>{selectedCall?.to}</Typography>
                            <Typography sx={styles.modalText}>{selectedCall?.via}</Typography>
                        </Box>
                    </Box>
                    <Box sx={styles.notesContainer}>
                        <Typography sx={styles.subTitle}>Notes</Typography>
                        <TextField
                            placeholder="Add Notes"
                            fullWidth
                            sx={styles.addNotes}
                            rows={3}
                            multiline
                            value={note}
                            onChange={(e)=>setNote(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box sx={styles.ModalFooter}>
                    <Button sx={styles.saveBtn} onClick={handleNoteSubmit}>SAVE</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CallModal