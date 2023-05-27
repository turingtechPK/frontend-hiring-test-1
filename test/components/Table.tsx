import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../utils/api';
import Cookies from 'js-cookie';
import { Call } from '@/utils/useFetch';

interface IProps {
    data: Call[]
}

const AccessibleTable = ({ data }: IProps) => {

    const formatTime = (seconds: number) => {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        return minutes + " minutes " + (remainingSeconds < 10 ? "0" : "") + remainingSeconds + " seconds";
    }

    const capitalizeWord = (word: string | String) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const ArchiveCall = (id: string) => {
        axios.put(`/calls/${id}/archive`, {}, { headers: { 'Authorization': `Bearer ${Cookies.get('accessToken')}` } })
            .then((res) => {
                console.log("success");
            })
            .catch((err) => {
                console.log(err.code);
                console.log(Object.keys(err));
            })
    }

    return (
        <TableContainer component={Paper} style={{ width: '100%' }} >
            <Table>
                <TableHead>
                    <TableRow className='bg-slate-200'>
                        <TableCell align="center">CALL TYPE</TableCell>
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
                    {data && data?.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="center" >
                                <p className={`${row.call_type === 'answered' ? 'text-emerald-500' : 'text-black'} ${row.call_type === 'missed' ? 'text-red-600' : 'text-black'} ${row.call_type === 'voicemail' ? 'text-primary' : 'text-black'}`}>
                                    {capitalizeWord(row.call_type)}
                                </p>
                            </TableCell>
                            <TableCell align="left"><p className='text-primary'>{capitalizeWord(row.direction)}</p></TableCell>
                            <TableCell align="left">{formatTime(row.duration)}<br /><span className='text-primary'>({row.duration} seconds)</span></TableCell>
                            <TableCell align="left">{row.from}</TableCell>
                            <TableCell align="left">{row.to}</TableCell>
                            <TableCell align="left">{row.via}</TableCell>
                            <TableCell align="left">{row.created_at.split('T')[0]}</TableCell>
                            <TableCell align="left"><div className={` py-1 text-center cursor-pointer ${row.is_archived ? ' bg-emerald-100 text-emerald-500   ' : 'text-slate-500 bg-slate-200'}`}>{row.is_archived ? 'Archived' : 'Unarchive'}</div></TableCell>
                            <TableCell align="left"><div className={'py-1 text-center text-white bg-primary hover:cursor-pointer'}>Add Note</div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default AccessibleTable;
