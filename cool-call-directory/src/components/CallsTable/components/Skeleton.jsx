import React, {  } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Skeleton } from '@mui/material';

export default function CallsTableSekelton({rows=10}) {
 return (
    <TableBody>
    {[...Array(rows).keys()].map((row, index) => {
        return (
            <TableRow key={index+'_key'}>
                <TableCell padding="checkbox">
                    <Checkbox
                    color="primary"
                    disabled
                    />
                </TableCell>
                <TableCell><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
                <TableCell align="left"><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
                <TableCell align="left"><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
                <TableCell align="left"><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
                <TableCell align="left"><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
                <TableCell align="left"><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
                <TableCell align="left"><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
                <TableCell align="left"><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
                <TableCell align="left"><Skeleton width={'100%'} variant="text" sx={{ fontSize: '1.5rem' }} /></TableCell>
            </TableRow>
        );
    })}
    </TableBody>
  );
}