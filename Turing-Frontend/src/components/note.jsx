import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function FormDialog({ id }) {
    const [open, setOpen] = React.useState(false);
    const [call, setCall] = React.useState('');
    const [note, setNote] = useState('')

    const handleClickOpen = async () => {
        setOpen(true);
        try {
            // get token from  cookies
            console.log("HERE")
            const token = Cookies.get('access_token');
            // make request calls/:id
            const response = await axios.get(
                `https://frontend-test-api.aircall.io/calls/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("RESPONSE: ", response)
            const callData = response.data;
            setCall(callData)


            console.log(callData)
        } catch (error) {
            console.error('Fetch failed:', error);
            // Handle errors here
        }
    };

    const handleClose = async() => {
        // POST / calls /: id / note create a note and add it prepend it to the call's notes list.

        //     `/calls/:id/note`

        // Body
        // {
        //     content: String!
        // }
        const response = await axios.post(
            `https://frontend-test-api.aircall.io/calls/${id}/note`,
            {
                content: note
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            }
        );

        // fetch the call again
        // make request calls/:id
        const responseCall = await axios.get(
            `https://frontend-test-api.aircall.io/calls/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            }
        );

        setCall(responseCall.data)


    };

    const handleCancel = () => {
        setOpen(false);
    };



    return (
        <div>
            <Button className='bg-blue-500 text-md text-white lowercase ' onClick={handleClickOpen}>
                Add Note
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add Note</DialogTitle>
                <DialogContent>
                    <div>
                        {call && <div className='flex gap-y-2 flex-col'>
                            <div className='bg-blue-100 p-3 rounde-lg'>ID: {call.id}</div>
                            <div className='bg-blue-100 p-3 rounde-lg'>Duration: {call.duration}</div>
                            <div className='bg-blue-100 p-3 rounde-lg'>From: {call.from}</div>
                            <div className='bg-blue-100 p-3 rounde-lg'>To: {call.to}</div>
                            <div className='bg-blue-100 p-3 rounde-lg'>Via: {call.via}</div>




                        </div>}
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New Note"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <h1 className='p-2 bg-gray-200 my-2'>All Notes</h1>
                    <div>
                        {call && <div className='flex gap-y-2 flex-col'>
                            {call.notes.map((note) => (
                                <div className='bg-white shadow-md my-2 p-3 rounde-lg'>{note.content}</div>
                            ))}
                            </div>}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}