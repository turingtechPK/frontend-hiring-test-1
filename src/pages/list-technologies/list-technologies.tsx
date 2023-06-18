//lib
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useNavigate } from 'react-router';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import React, {useEffect, useState} from 'react';
import { CircularProgress } from '@mui/material';
import { Box, Button, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
//src
import { Navbar } from '../../components/navbar/navbar';
import { TableDataType } from './list-technologies.type';
import { ListTechnologiesStyled } from './list-technologies.style'
import { AddNotesDialog } from './add-notes-dialog/add-notes-dialog';
import { getList } from '../../services/list-technologies/list-technologies.api';
import { PaginationWrapper } from '../../components/paginnation-wrapper/pagination-wrapper';


export const ListTechnologies = () => {
    const limit = 10;
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tableData, setTableData] = useState<TableDataType>();

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const handleClick = (id: string) => {
        setIsDialogOpen(true);
        setId(id);
    }

    const getFullList = async(token: string, offset: number, limit: number) =>{
        setIsLoading(true);
        const list = await getList(token, offset, limit);
        setTableData(list);
        setIsLoading(false);
    }

    useEffect(()=>{
        const token = localStorage.getItem('jwtToken');
        if(token){
            getFullList(token, offset ,limit)
        }
        else{
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[offset,limit])
    
  return (
    <ListTechnologiesStyled>
        <Navbar/>
        {isLoading && <CircularProgress color='secondary' size={50} className='loader'/>}
        {!isLoading &&
        <Box className='container'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" className="table-wrapper">
                    <TableHead className='head'>
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
                    
                    <TableBody className='body'>
                        {tableData?.nodes?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={row.call_type}>{row.call_type.toUpperCase()}</TableCell>
                                <TableCell className='direction'>{row.direction}</TableCell>
                                <TableCell >{row.duration}</TableCell>
                                <TableCell >{row.from}</TableCell>
                                <TableCell >{row.to}</TableCell>
                                <TableCell >{row.via}</TableCell>
                                <TableCell >{row.created_at}</TableCell>
                                <TableCell >{row.is_archived ? 'Archived':'Unarchived'}</TableCell>
                                <TableCell ><Button className='button' onClick={()=> handleClick(row.id)} id={row.id}>Action</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                
                </Table>
            </TableContainer>
        </Box>
        }
        <Box className='pagination'>
            <PaginationWrapper setOffset={setOffset} totalPages={tableData?.totalCount || 0}/>
        </Box>
        <AddNotesDialog isDialogOpen={isDialogOpen} onClose={handleClose} id={id}/>
    </ListTechnologiesStyled>
  )
}

