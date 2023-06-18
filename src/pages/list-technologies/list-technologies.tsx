import React, {useEffect, useState} from 'react'
import { ListTechnologiesStyled } from './list-technologies.style'
import { Box, TableCell } from '@mui/material';
// import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getList } from '../../services/list-technologies/list-technologies.api';
import { TableDataType } from './list-technologies.type';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));


export const ListTechnologies = () => {
    const [tableData, setTableData] = useState<TableDataType>();
    const getFullList = async(token: string) =>{
        const list = await getList(token);
        setTableData(list);
        console.log('list',list);
    }

    useEffect(()=>{
        const token = localStorage.getItem('jwtToken');
        if(token){
            getFullList(token)
        }
    },[])
    
  return (
    <ListTechnologiesStyled>
        <Box className='container'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <TableCell>CALL TYPE</TableCell>
                        <TableCell >DIRECTION</TableCell>
                        <TableCell >DURATION</TableCell>
                        <TableCell >FROM</TableCell>
                        <TableCell >TO</TableCell>
                        <TableCell >VIA</TableCell>
                        <TableCell >CREATED AT</TableCell>
                        <TableCell >STATUS</TableCell>
                        <TableCell >ACTIONS</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.nodes?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell >{row.call_type}</TableCell>
                                <TableCell >{row.direction}</TableCell>
                                <TableCell >{row.duration}</TableCell>
                                <TableCell >{row.from}</TableCell>
                                <TableCell >{row.to}</TableCell>
                                <TableCell >{row.via}</TableCell>
                                <TableCell >{row.created_at}</TableCell>
                                <TableCell >{row.is_archived ? 'Archived':'Unarchived'}</TableCell>
                                <TableCell >action</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </ListTechnologiesStyled>
  )
}

