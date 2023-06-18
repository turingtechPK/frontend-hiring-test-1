import Modal from '@mui/material/Modal';
import Textarea from '@mui/joy/Textarea';
import React,{useEffect,useState} from 'react'
import { CircularProgress } from '@mui/material';
import {Box,Button, Divider} from '@mui/material';
import Typography from '@mui/material/Typography';


import { AddNotesDialogStyled } from './add-notes-dialog.style';
import { AddNotesDialogPropsType, TechnologyDataType } from './add-notes-dialog.type';
import { addNote, getListById } from '../../../services/list-technologies/list-technologies.api';

export const AddNotesDialog = ({isDialogOpen, onClose, id}: AddNotesDialogPropsType) => {
    const [note, setNote] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [technology, setTechnology] = useState<TechnologyDataType>();

    const handleSave = async() =>{
        setIsLoading(true);
        await addNote(localStorage.getItem('jwtToken') || '', id, note || '');
        const data = await getListById(localStorage.getItem('jwtToken') || '', id);
        setTechnology({...data});
        setNote('');
        setIsLoading(false);
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height:400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'overlay'
      };

      const getTechnology = async(token: string) =>{
            setIsLoading(true);
            const data = await getListById(token, id)
            setTechnology({...data});
            setNote('');
            setIsLoading(false);
      }

      useEffect(()=>{
        console.log('id',id);
        const token = localStorage.getItem('jwtToken') || '';
        getTechnology(token);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[id])

  return (
      <Modal
        open={isDialogOpen || false}
        onClose={onClose}
      >
        <Box sx={style}>
        <AddNotesDialogStyled>
        {isLoading && <Box className='loader'><CircularProgress/></Box>}
        {!isLoading &&
        <>
          <Box className='header'>
            <Typography variant="h6" component="h2" className='title'>
                Add Notes
            </Typography>
            <Typography variant="h6" component="h3" className='technology-id'>
                Call Id {technology?.id}
            </Typography>
          </Box>
          <Divider/>
          <Box className='content'>
          <Box>CALL TYPE : {technology?.call_type}</Box>
          <Box>DURATION : {technology?.duration}</Box>
          <Box>TO : {technology?.to}</Box>
          <Box>FROM : {technology?.from}</Box>
          <Box>VIA : {technology?.via}</Box>
          <Box>Notes</Box>
          <Box>
            <ul>
                {technology?.notes?.map((note:any)=>{
                    return (<li key={note?.id}>{note?.content}</li>)
                })}
            </ul>
          </Box>
          <Textarea className='text-area' value={note} onChange={e=>setNote(e.target.value)} placeholder="Add Notes" variant="outlined" />
          </Box>
          <Divider/>
          <Button className='button' variant="outlined" onClick={handleSave}>Save</Button>
          </>
        }
        </AddNotesDialogStyled>
        </Box>
      </Modal>
  )
}
