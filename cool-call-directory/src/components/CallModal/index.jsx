import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, IconButton, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon

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

export default function CallModal({ call, open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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
              Call ID {call?.id}
            </Typography>
            <Divider sx={{ margin: '20px 0' }} variant="fullWidth" />
            <Table sx={{maxWidth:'300px', marginBottom:'10px'}}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none' }}>Call Type:</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{call?.call_type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none' }}>Duration:</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{call?.duration}</TableCell>
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
              </TableBody>
            </Table>
            <TextField
                id="outlined-multiline-static"
                label="Add Notes"
                multiline
                rows={4}
                fullWidth
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
