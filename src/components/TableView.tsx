import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Popup from './Popup';
import { Typography } from '@mui/material';
import { changeStatus, fetchCalls } from '../feature/callSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface CallNote {
    id: string;
    content: string;
}

interface Call {
    id: string;
    duration: number;
    is_archived: boolean;
    from: string;
    to: string;
    direction: string;
    call_type: string;
    via: string;
    created_at: string;
    notes: CallNote[];
}

interface CallTableProps {
    data: Call[];
}

const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
        <div>
            {`${minutes} minutes ${remainingSeconds} seconds`}
            <br />
            <span style={{ color: '#5560EC' }}>({seconds} seconds)</span>
        </div>
    );
};

const getCallTypeStyle = (callType: string) => {
    const typeStyles: { [key: string]: React.CSSProperties } = {
        'Missed': { color: 'red' },
        'Answered': { color: 'green' },
        'Voice mail': { color: '#95A4F0' },
        'Archived': {
            color: '#1DC9B7',
            backgroundColor: 'rgba(29, 201, 183, 0.3)',
            padding: '4px'
        },
        'Unarchived': {
            color: '#727272',
            backgroundColor: 'rgba(114, 114, 114, 0.3)',
            padding: '4px'
        },
    };

    return typeStyles[callType] || {};
};

const TableView: React.FC<CallTableProps> = ({ data }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Call | null>(null);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const openPopup = (row: Call) => {
        setSelectedRow(row);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setSelectedRow(null);
        setPopupOpen(false);
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <Typography>No data available.</Typography>;
    }

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await dispatch(changeStatus({ id, status })); 
            await dispatch(fetchCalls({ offset: 10, limit: 10 })).unwrap();
        } catch (error) {
            console.error('Status change failed:', error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>Call Type</TableCell>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>Direction</TableCell>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>Duration</TableCell>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>From</TableCell>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>To</TableCell>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>Via</TableCell>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>Created At</TableCell>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>Status</TableCell>
                        <TableCell sx={{ backgroundColor: '#F4F4F9' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((call) => (
                        <TableRow key={call.id}>
                            <TableCell
                                style={getCallTypeStyle(capitalizeFirstLetter(call.call_type))}
                            >
                                {capitalizeFirstLetter(call.call_type)}
                            </TableCell>
                            <TableCell sx={{ color: '#95A4F0' }}>{capitalizeFirstLetter(call.direction)}</TableCell>
                            <TableCell>
                                {formatDuration(call.duration)}
                            </TableCell>
                            <TableCell>{call.from}</TableCell>
                            <TableCell>{call.to}</TableCell>
                            <TableCell>{call.via}</TableCell>
                            <TableCell>{formatDate(call.created_at)}</TableCell>
                            <TableCell>
                                {call.is_archived ? (
                                    <Button
                                        style={getCallTypeStyle('Archived')}
                                        onClick={() => handleStatusChange(call.id, 'unarchive')}
                                    >
                                        Archived
                                    </Button>
                                ) : (
                                    <Button
                                        style={getCallTypeStyle('Unarchived')}
                                        onClick={() => handleStatusChange(call.id, 'archive')}
                                    >
                                        Unarchived
                                    </Button>
                                )}
                            </TableCell>
                            <TableCell>
                                <Button
                                    style={{
                                        backgroundColor: '#4F46F8',
                                        color: 'white',
                                        width: '70px',
                                        height: '26px',
                                        fontSize: '9px',
                                    }}
                                    onClick={() => openPopup(call)}
                                >
                                    Add Note
                                </Button>
                            </TableCell>

                            {isPopupOpen && (
                                <Popup open={isPopupOpen} onClose={closePopup} data={selectedRow} />
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableView;
