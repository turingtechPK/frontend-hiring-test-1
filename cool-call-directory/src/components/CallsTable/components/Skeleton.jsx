import React, {  } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Skeleton } from '@mui/material';

export default function CallsTableSekelton() {
 return (
    <TableBody>
    {[1,2,3,4,5,6,7,8,9,10].map((row, index) => {
        return (
            <TableRow>
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