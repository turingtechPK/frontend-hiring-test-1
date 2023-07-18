import React,{useState} from "react";
import { TableContainer, TableBody, Table, TableHead, TableRow, Paper, TableCell, TablePagination } from "@mui/material";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const MyTable = ({data} ) => {
    const rowsPerPageOptions = [5, 10];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [currData, setCurrData]=useState('');
    const [selectedRow, setSelectedRow] = useState();

    var lol = data.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const calculateMinutes = (seconds) => {
        let mins = seconds/60;
        mins = Math.floor(mins)
        let remaining = seconds-mins*60;
        var mins_and_seconds = `${mins} minutes ${remaining} seconds`;

        return mins_and_seconds;
        
    }

    const printType = (text) =>{
        
        if (text === "Missed"){
            return <TableCell sx={{color:"red"}}>{text}</TableCell>
        }
        else if (text === "Answered"){
            return <TableCell sx={{color:"green"}}>{text}</TableCell>
        }
        else if (text == "Voice Mail"){
            return <TableCell sx={{color:"Blue"}}>{text}</TableCell>
        }

    }

    const onRowClick = () => {

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

                    {lol.map ((val,i)=> (
                        <TableRow onClick={() => setSelectedRow(val)}>
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
                            <Button variant='contained'>Add Note</Button>
                            </ThemeProvider>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>

                    {selectedRow && (
                        <>
                        ale
                        </>
                    )}
                
            </Table>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={data.length}
                // count={100}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
            
        </div>
    )

}

export default MyTable;