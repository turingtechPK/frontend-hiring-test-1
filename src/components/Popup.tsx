import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Typography, TextField, Box, IconButton, Divider, AlertColor, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addNotes, fetchCalls } from '../feature/callSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';

interface CallNote {
    id: string;
    content: string;
}

interface Call {
    id: string;
    duration: number;
    is_archived: boolean;
    from: string;
    to: string;
    direction: string;
    call_type: string;
    via: string;
    created_at: string;
    notes: CallNote[];
}

interface PopupProps {
    open: boolean;
    onClose: () => void;
    data: Call | null;
}

const Popup: React.FC<PopupProps> = ({ open, onClose, data }) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [noteContent, setNoteContent] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'info'>('info');

    const handleSaveNote = async () => {
        if (data) {
            const callId = data.id;
            dispatch(addNotes({ id: callId, content: noteContent }) as any);
            await dispatch(fetchCalls({ offset: 10, limit: 10 })).unwrap();
            onClose();
        } 
    };

    const closeToast = () => {
        setToastOpen(false);
      };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
            PaperProps={{
                style: {
                    boxShadow: 'none',
                    margin: '16px',
                    width: '400px',
                },
            }}
        >
            <DialogTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Add Note</span>
                    <IconButton onClick={onClose} sx={{ color: '#4F46F8' }}>
                        X
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {data && (
                    <div>
                        <Typography variant="body2" style={{ color: '#4F46F8', marginTop: '8px' }}>
                            Call ID: {data.id}
                        </Typography>
                        <Box width="100%">
                            <Divider style={{ margin: '8px 0' }} />
                        </Box>
                        <Typography variant="body2">
                            Call Type: {data.call_type}
                        </Typography>
                        <Typography variant="body2">
                            Duration: {data.duration}
                        </Typography>
                        <Typography variant="body2">
                            From: {data.from}
                        </Typography>
                        <Typography variant="body2">
                            To: {data.to}
                        </Typography>
                        <Typography variant="body2">
                            Via: {data.via}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '8px' }}>
                            Notes
                        </Typography>
                        <List>
                            {data.notes.map((note, index) => (
                                <ListItem key={note.id}>
                                    <ListItemText primary={`${index + 1}. ${note.content}`} />
                                </ListItem>
                            ))}
                        </List>
                        <TextField
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            placeholder="Add Notes"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                        />
                        <Button
                            style={{ backgroundColor: '#4F46F8', color: 'white', width: '100%' }}
                            onClick={handleSaveNote}
                        >
                            Save
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Popup;
