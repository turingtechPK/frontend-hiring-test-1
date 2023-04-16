import React, { useState } from 'react'
import { TableRow, TableCell, Button, Modal, Card, TextField } from '@mui/material'
import './CallTableEntry.css'
import axios from 'axios'


const CallTableEntry = (props) => {
    const [entry, setEntry] = useState(props.entry)
    const [expandedEntry, setExpandedEntry] = useState(false)
    const [newNote, setNewNote] = useState("")

    const handleArchivedChange = () => {
        setEntry(prevEntry => ({
            ...prevEntry,
            is_archived: !prevEntry.is_archived
        }));

        // axios.put(`/calls/${entry.id}/archive`, { is_archived: !entry.is_archived })
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const handleNoteSubmit = event => {
        event.preventDefault()

        // axios.post(`/calls/${entry.id}/note`, newNote)
        //   .then(response => {
        //     console.log(response.data)

        //     setEntry(prevEntry => ({
        //       ...prevEntry,
        //       notes: [newNote, ...prevEntry.notes]
        //     }))
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
        // setEntry(prevEntry => ({
        //     ...prevEntry,
        //     notes: [{ id: 12345, content: { newNote } }, ...prevEntry.notes]
        // }))
        setNewNote("");
        setExpandedEntry(false);
    }
    return (

        <TableRow key={entry.id}>
            <TableCell
                sx={{
                    color: entry.call_type === "answered" ? 'green' : entry.call_type === "voicemail" ? "blue" : entry.call_type === "missed" ? "red" : "white"
                }}
            >{entry.call_type}</TableCell>
            <TableCell>{entry.direction}</TableCell>
            <TableCell>{entry.duration}</TableCell>
            <TableCell>{entry.from}</TableCell>
            <TableCell>{entry.to}</TableCell>
            <TableCell>{entry.via}</TableCell>
            <TableCell>{entry.created_at}</TableCell>
            <TableCell>
                <Button
                    variant='outlined'
                    color={entry.is_archived ? "success" : "warning"}
                    onClick={handleArchivedChange}>
                    {entry.is_archived ? "Archived" : "Unarchived"}
                </Button>
            </TableCell>
            <TableCell>
                <Button onClick={() => setExpandedEntry(true)} variant='contained'>Add Note</Button>
            </TableCell>
            {
                expandedEntry ? <Modal
                    sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}
                    open={expandedEntry}
                    onClose={() => { setExpandedEntry(false) }}>

                    <Card
                        sx={{
                            width: 400, height: 400,
                            padding: "2%"
                        }}
                    >
                        <div className='card-header'>
                            <h4>Add Note</h4>
                            <p>Call ID: {entry.id}</p>
                        </div>
                        <div className='details'>
                            <div>
                                <span><b>Call Type: </b></span>
                                <span>{entry.call_type}</span>
                            </div>
                            <div>
                                <span><b>Duration: </b></span>
                                <span>{entry.duration}</span>
                            </div><div>
                                <span><b>From: </b></span>
                                <span>{entry.from}</span>
                            </div>
                            <div>
                                <span><b>To: </b></span>
                                <span>{entry.to}</span>
                            </div>
                            <div>
                                <span><b>Via: </b></span>
                                <span>{entry.via}</span>
                            </div>

                        </div>
                        <div>
                            <div>
                                <h4>Notes</h4>
                                <div className='add-note'>
                                    <TextField
                                        value={newNote}
                                        onChange={(e) => handleNoteChange(e)} />
                                    <Button variant="contained"
                                        sx={{ margin: "2%" }}
                                        onClick={(e) => handleNoteSubmit(e)}>Save</Button>
                                </div>
                            </div>
                        </div>

                    </Card>
                </Modal> : null
            }
        </TableRow >
    )
}

export default CallTableEntry