import React,{useState, useEffect} from "react";
import { TableContainer, TableBody, Table, TableHead, TableRow, Paper, TableCell, TablePagination } from "@mui/material";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { getCalls } from "../../api";

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#4F46F8',
        darker: '#4137fa',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

const MyTable = () => {
    const rowsPerPageOptions = [5, 10];
    
    const [data, setData]= useState([]);
    const [totalCount, setTotalCount]= useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const [open, setOpen] = useState(false);
    const [dialog, setDialog] =useState();
    
    var lol = data.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage);

    const handleChangePage = async (event, newPage) => {
        console.log(`newPage: ${newPage}`)
        setPage(newPage);
        await getData(newPage, rowsPerPage);
    };


    const handleChangeRowsPerPage = async (event, val) => {
        const _rows = parseInt(event.target.value, 10);
        const _page = 0;
        setRowsPerPage(_rows);
        setPage(_page);
        await getData(_page,_rows);
    };

    const calculateMinutes = (seconds) => {
        let mins = seconds/60;
        mins = Math.floor(mins)
        let remaining = seconds-mins*60;
        var mins_and_seconds = `${mins} minutes ${remaining} seconds`;

        return mins_and_seconds;
        
    }
    
    const getData = async (_page, _rows) => {
        try{
            const response = await getCalls(_page, _rows);
            console.log(response);
            setData(response.data.nodes);
            setTotalCount(response.data.totalCount)
        } catch (error){
          console.error("error: ", error);
        }
        
      }

    useEffect( () => { 
    getData(page, rowsPerPage);

    }, []) 

    const handleClickOpen = async (dialogData) => {
        if (! open){
            var text = await dialogData;
            setDialog(dialogData);
            console.log(dialogData);
            setOpen(true)
        }
      };
    
      const handleClose = (e) => {
        console.log(e);
        if (!open)
            return
        else
            setOpen(false);
        return;
      };


    const printType = (text) =>{
        
        if (text === "missed"){
            return <TableCell sx={{color:"red"}}>{text}</TableCell>
        }
        else if (text === "answered"){
            return <TableCell sx={{color:"green"}}>{text}</TableCell>
        }
        else if (text == "voicemail"){
            return <TableCell sx={{color:"Blue"}}>{text}</TableCell>
        }

    }

    return (
        <div>
        <TableContainer component={Paper }>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Call Type</TableCell>
                        <TableCell>Direction</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Via</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>

                    {data.map ((val,i)=> (
                        <TableRow>
                        {/* <TableCell>{val.call_type}</TableCell> */}
                        {printType(val.call_type)}
                        <TableCell>{val.direction}</TableCell>
                        <TableCell>{calculateMinutes(val.duration)}<br/><p className="dark-blue">({val.duration} seconds)</p></TableCell>
                        <TableCell>{val.from}</TableCell>
                        <TableCell>{val.to}</TableCell>
                        <TableCell>{val.via}</TableCell>
                        <TableCell>{val.created_at}</TableCell>
                        { val.is_archived ? (<TableCell sx={{color: "green" }}>Archived </TableCell>) : (<TableCell sx={{ color: "grey"}}>Unarchived</TableCell>)}
                        <TableCell>
                            <ThemeProvider theme={theme}>
                            <Button variant='contained' onClick={ () => handleClickOpen(val)}>Add Note</Button>
                            </ThemeProvider>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                
            </Table>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={totalCount}
                // count={100}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
            
            <div>
                {open && (
                <Dialog open={open} onClose={handleClose} fullWidth>
                    <DialogTitle>Add Notes</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Add Notes
                        <p color="dark-blue">Call ID {dialog.id}</p>
                        <br/>
                        <p><b>Call Type</b>    {dialog.call_type}</p>
                        <p><b>Duration</b>     {calculateMinutes(dialog.duration)}</p>
                        <p><b>From</b>    {dialog.from}</p>
                        <p><b>To</b>    {dialog.to}</p>
                        <p><b>Via</b>    {dialog.via}</p>
                        {dialog.notes.map((val,i)=>(
                            <p>val</p>
                        ))}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="notes"
                        label="Add Notes"
                        type="text"
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>handleClose(this)}>Save</Button>
                    </DialogActions>
                </Dialog>
                )}
            </div>
        </div>
    )

}

export default MyTable;