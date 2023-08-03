import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotesIcon from '@mui/icons-material/Notes';
import Button from '@mui/lab/LoadingButton';
import { addNote } from '../../services/mutations';
import { convertSecondsToMinutesAndSeconds } from '../../helpers/util';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxWidth:'90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
  };

export default function CallModal({ call, open, setOpen, refetchCurrentPage }) {
    
    const [noteContent,setNoteContent] = useState("");
    const [savingNote, setSavingNote] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        if(call?.notes.length){
            setNotes(call.notes);
        }
    },[call])
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const saveNote = async () => {
        if(!noteContent.trim()){
            alert('You must type something in a note');
            return;
        }
        setSavingNote(true);
        const response = await addNote(call.id,noteContent);
        await refetchCurrentPage();
        setNotes(response.notes);
        setNoteContent('');
        setSavingNote(false);
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
        <Fade in={open}>
        <Box sx={style}>
            {/* Cross button */}
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1,
            }}
            >
            <CloseIcon />
            </IconButton>
            {/* Modal content */}
            <Typography id="transition-modal-title" variant="h6" component="h2">
            Add Notes
            </Typography>
            <Typography variant="subtitle2" component="h5" fontSize={'0.6rem'} color={'color.primary'}>
            Call ID <span className='text-info'>{call?.id}</span>
            </Typography>
            <Divider sx={{ margin: '20px 0' }} variant="fullWidth" />
            <Table sx={{ marginBottom:'10px'}}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none' }}>Call Type:</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                            <Typography 
                                textTransform={'capitalize'}
                                className={`
                                    ${call?.call_type === 'answered'
                                    ? ' text-success ' 
                                    : call?.call_type === 'missed' 
                                    ? ' text-danger ' 
                                    : ' text-info ' }
                                `}
                            >
                                {call?.call_type}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none' }}>Duration:</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>{convertSecondsToMinutesAndSeconds(call?.duration/1000)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none' }}>From:</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>{call?.from}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none' }}>To:</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>{call?.to}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none' }}>Via:</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>{call?.via}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none' }}>Notes:</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                
                            </List>
                            <List dense>
                                {notes?.map((note) => 
                                    <ListItem key={note.id} disablePadding sx={{marginBottom:'5px'}}>
                                        <ListItemIcon>
                                            <NotesIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={note?.content}/>
                                    </ListItem>
                                )}
                            </List>
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <TextField
                id="outlined-multiline-static"
                label="Add Notes"
                multiline
                rows={4}
                fullWidth
                value={noteContent}
                onChange={(e)=> setNoteContent(e.target.value)}
            />
            <div style={{textAlign: 'end', margin:'10px 0'}}>
                <Button 
                    variant='contained'
                    onClick={saveNote}
                    loading={savingNote}
                >
                    Save
                </Button>
            </div>
        </Box>
        </Fade>
    </Modal>
    );
}
