import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { RxCross1 } from 'react-icons/rx';
import { TextField } from '@mui/material';
import axios from '../utils/api';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    py: 2
};


export default function NoteModal({ open, handleModalClose, data }: any) {
    const [note, setNote] = useState('');

    const CapitalizeWord = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const FormatTime = (seconds: number) => {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        return minutes + " minutes " + (remainingSeconds < 10 ? "0" : "") + remainingSeconds + " seconds";
    }

    const PostNote = () => {
        axios.post(`/calls/${data.id}/note`, { content: note }, { headers: { 'Authorization': `Bearer ${Cookies.get('accessToken')}` } })
            .then((res) => {
                toast.success('✅ Successfully Updated!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((err) => {
                toast.error('📛 An Error Occurred!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
        handleModalClose();
    }

    return (
        <div>
            <ToastContainer />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleModalClose}
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
                        <div className='px-5 pt-4 flex justify-between'>
                            <div>
                                <h3 className='font-semibold text-lg'>
                                    Add Notes
                                </h3>
                                <p id="transition-modal-description" className='text-xs mt-2 mb-4 text-primary font-semibold'>
                                    Call ID {data.id}
                                </p>
                            </div>
                            <RxCross1 className='mt-2 text-primary hover:cursor-pointer' size={20} onClick={handleModalClose} />
                        </div>
                        <div className='border-b-[0.5px] border-slate-400 w-[100%]' />
                        <div className='px-5 pt-4'>
                            <div className='flex'>
                                <div>
                                    <p className='text-sm font-bold'>Call Type</p>
                                    <p className='text-sm font-bold'>Duration</p>
                                    <p className='text-sm font-bold'>From</p>
                                    <p className='text-sm font-bold'>To</p>
                                    <p className='text-sm font-bold'>Via</p>
                                </div>
                                <div className='ml-4'>
                                    <p className='text-sm font-semibold ml-2 text-primary'>{CapitalizeWord(data.call_type)}</p>
                                    <p className='text-sm font-semibold ml-2 text-primary'>{FormatTime(data.duration)}</p>
                                    <p className='text-sm font-semibold ml-2 text-primary'>{data.from}</p>
                                    <p className='text-sm font-semibold ml-2 text-primary'>{data.to}</p>
                                    <p className='text-sm font-semibold ml-2 text-primary'>{data.via}</p>
                                </div>
                            </div>
                            <p className='text-sm font-bold mt-5 mb-1'>Notes</p>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                // cols={16}
                                placeholder="Add Notes"
                                sx={{ width: '400px', mb: 1 }}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        <div className='border-b-[0.5px] border-slate-400 w-[100%] ' />
                        <div onClick={PostNote} className='px-6 py-2 text-sm bg-primary rounded-sm text-white text-center hover:bg-primary/70 ease-in 300 mt-5 mb-2 mx-5 cursor-pointer'>Save</div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}