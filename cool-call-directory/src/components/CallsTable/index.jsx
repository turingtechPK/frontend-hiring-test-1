import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { getPaginatedCalls } from '@/services/queries';
import CallsTableToolbar from './components/Toolbar';
import CallsTableHead from './components/Head';
import CallsTableSkeleton from './components/Skeleton';
import { Button, Chip, FormControlLabel, Switch, TableFooter, Typography } from '@mui/material';
import CallModal from '../CallModal';
import { useRouter } from 'next/navigation';
import { archiveCall } from '../../services/mutations';
import { convertSecondsToMinutesAndSeconds, getComparator, stableSort } from '../../helpers/util';


function createData({id, call_type, direction, duration, from, to, via, created_at, status, action,is_archived,notes}) {
  return {
    id,
    call_type, 
    direction, 
    duration, 
    from, 
    to, 
    via, 
    created_at, 
    status, 
    action,
    is_archived,
    notes
  };
}

export default function CallsTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('direction');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [totalCount,setTotalCount] = useState(0);
  const [selectedCall, setSelectedCall] = useState(null);  
  const [callDetailsModalOpen, setCallDetailModalOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [groupByDate, setGroupByDate] = useState(false);

  const router = useRouter();

  useEffect(()=>{
    fetchPaginatedCalls();
  },[page, rowsPerPage])

  useEffect(()=>{
    if (selectedCall) {
      setCallDetailModalOpen(true);
    }
  },[selectedCall])

  useEffect(()=>{
    if (groupByDate) {
      setFilteredResults(stableSort(calls,getComparator('desc','created_at')));
    }
  },[groupByDate,calls])

  const fetchPaginatedCalls = async () => {
    try{
      setLoading(true);
      const calls = await getPaginatedCalls(page, rowsPerPage);
      setCalls(calls.nodes.map((call) => createData(call)));
      setFilteredResults(calls.nodes.map((call) => createData(call)));
      setHasNext(calls.hasNext);
      setTotalCount(calls.totalCount);
    } catch(e) {
      alert('Session Expired. Please signin again.');
      router.push('/auth');
    } finally {
      setLoading(false);
    }
  }

  const archiveSelected = async () => { 
    await Promise.all(selected.map((id)=>{
      return archiveCall(id);
    }));
    await fetchPaginatedCalls();
  }
  
  const filter = (filters) => {
    if(filters.length<1){
      setFilteredResults(calls);
      return;
    }

    setFilteredResults(calls.filter((call)=> filters.includes(call.call_type)));
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = calls.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewCall = (event, callId) => {
    event.stopPropagation();
    const selectedCall = calls.find((call) => callId === call.id);
    setSelectedCall(JSON.parse(JSON.stringify(selectedCall)));
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <React.Fragment>
      <CallModal
        call={selectedCall}
        open={callDetailsModalOpen}
        setOpen={setCallDetailModalOpen}
        refetchCurrentPage={fetchPaginatedCalls}
        
      />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <CallsTableToolbar numSelected={selected.length} onArchive={archiveSelected} onSelectFilter={filter}/>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <CallsTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                rowCount={calls.length}
              />
            
                {loading ? (
                  <CallsTableSkeleton rows={rowsPerPage}/>
                ) : calls.length === 0 ? (
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        No Data
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ): (
                  <TableBody>
                  {filteredResults.map((row, index, allResults) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const currentGroupDate = new Date(row.created_at).toLocaleDateString();
                    const indexToLookAt = index - 1 < 0 ? 0 : index-1;
                    const lastGroupDate = new Date(allResults[indexToLookAt].created_at).toLocaleDateString();
    
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer', 
                          borderTop: groupByDate && (currentGroupDate !== lastGroupDate) ? 'solid 3px white' : 'inherit'
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row.id)}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Typography 
                            textTransform={'capitalize'}
                            className={`
                              ${row.call_type === 'answered'
                              ? ' text-success ' 
                              : row.call_type === 'missed' 
                              ? ' text-danger ' 
                              : ' text-info ' }
                            `}
                          >{row.call_type}</Typography>
                        </TableCell>
                        <TableCell align="left"><Typography textTransform={'capitalize'} className='text-info'>{row.direction}</Typography></TableCell>
                        <TableCell align="left">
                          <Typography>{convertSecondsToMinutesAndSeconds(row.duration)}</Typography>
                          <Typography fontSize={'0.8rem'}>(<span className='text-info'>{row.duration}</span> seconds)</Typography>
                        </TableCell>
                        <TableCell align="left">{row.from}</TableCell>
                        <TableCell align="left">{row.to}</TableCell>
                        <TableCell align="left">{row.via}</TableCell>
                        <TableCell align="left">{new Date(row.created_at).toLocaleDateString()}</TableCell>
                        <TableCell align="left">
                          <Chip label={row.is_archived ? 'Archived' : 'Unarchived'} color={row.is_archived ? 'success' : 'default'}/>
                        </TableCell>
                        <TableCell align="left">
                          <Button variant='contained' onClick={(e) => { handleViewCall(e, row.id) }}>
                            Add Note
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  </TableBody>
                )}     
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={groupByDate} onChange={(e)=> setGroupByDate(e.target.checked)} />}
          label="Group by date"
        />
      </Box>
    </React.Fragment>
  );
}