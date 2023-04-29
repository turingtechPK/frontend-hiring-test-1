import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { PAGINATED_CALLS_QUERY } from '../graphql/queries';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { ADD_NOTE_MUTATION, ARCHIVE_CALL_MUTATION } from '../graphql/mutations';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    filterContainer: {
        paddingTop: '80px',
        paddingLeft: '16px'
      },    
    formControl: {
        minWidth: 200,
      },
      });
  
const CallList = ({ onSelectCall }) => {
    const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const [archiveCall] = useMutation(ARCHIVE_CALL_MUTATION);

  const handleArchiveCall = async (callId, isArchived) => {
    try {
      await archiveCall({
        variables: { id: callId, isArchived: !isArchived },
        refetchQueries: [{ query: PAGINATED_CALLS_QUERY }],
      });
    } catch (error) {
      console.error('Failed to archive call:', error);
    }
  };


  const { loading, error, data } = useQuery(PAGINATED_CALLS_QUERY, {
    variables: { offset: page * rowsPerPage, limit: rowsPerPage },
  });
  const [addNote] = useMutation(ADD_NOTE_MUTATION);

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  const calls = data.paginatedCalls.nodes;
  const totalCount = data.paginatedCalls.totalCount;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s (${duration}s)`;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  };
  const handleAddNote = async (callId) => {
    try {
      const noteContent = prompt('Enter note content:');
      if (noteContent) {
        await addNote({
          variables: {
              activityId: callId,
              content: noteContent,
          },
        });
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
  const filteredRows = calls.filter((row) =>
    row.call_type.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <>
    <div className={classes.filterContainer}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel>Filter by Call Type</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Call Type">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="missed">Missed</MenuItem>
            <MenuItem value="answered">Answered</MenuItem>
            <MenuItem value="voicemail">Voicemail</MenuItem>
          </Select>
        </FormControl>
        </div>
      <TableContainer component={Paper}>
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
            <TableCell>Archived</TableCell>
            <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((call) => (
              <TableRow
                key={call.id}
                hover
                onClick={() => onSelectCall(call.id)}
                style={{ cursor: 'pointer' }}
              >
                                <TableCell>{call.call_type}</TableCell>
                                <TableCell>
                {call.direction === 'inbound' ? 'Inbound' : 'Outbound'}
              </TableCell>
                <TableCell>{formatDuration(call.duration)}</TableCell>
                <TableCell>{call.from}</TableCell>
                <TableCell>{call.to}</TableCell>
              <TableCell>{call.via}</TableCell>
              <TableCell>{formatDate(call.created_at)}</TableCell>
              <TableCell>
              <button
        onClick={() => handleArchiveCall(call.id, call.is_archived)}
      >

                {call.is_archived ? 'Archived' : 'Unarchive'}
                </button>
                </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddNote(call.id);
                  }}
                >
                  Add Note
                </Button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CallList;
