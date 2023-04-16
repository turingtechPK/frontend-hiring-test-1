import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material'

import './CallTable.css'
import CallTableEntry from './CallTableEntry/CallTableEntry'


const CallTable = ({ status }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const [entries, setEntries] = useState([]);

    const handleChangePage = (event, newPage) => {

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setEntries([]);
        //axios.get("https://frontend-test-api.aircall.io/calls")
        fetch("entries.json")
            .then(res => res.json())
            .then(data => {
                const filteredEntries =
                    status === "archived"
                        ? data.filter((entry) => entry.is_archived)
                        : status === "unarchived"
                            ? data.filter((entry) => !entry.is_archived)
                            : data;
                setEntries(filteredEntries);
            })
    }, [status, page])

    return (
        <div className='CallTable'>
            <TableContainer component={Paper} sx={{
                width: "100%",
            }}>
                <Table>
                    <TableHead
                        sx={{ backgroundColor: "#f4f4f9" }}
                    >
                        <TableRow>
                            <TableCell>CALL TYPE</TableCell>
                            <TableCell align="left">DIRECTION</TableCell>
                            <TableCell align="left">DURATION</TableCell>
                            <TableCell align="left">FROM</TableCell>
                            <TableCell align="left">TO</TableCell>
                            <TableCell align="left">VIA</TableCell>
                            <TableCell align="left">CREATED AT</TableCell>
                            <TableCell align="left">STATUS</TableCell>
                            <TableCell align="left">ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(entry => (
                            <CallTableEntry entry={entry} />
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[15, 25, 50]}
                    component="div"
                    count={entries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

        </div>
    )
}

export default CallTable;