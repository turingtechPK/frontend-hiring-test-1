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
import { stableSort, getComparator} from '@/helpers/util';
import CallsTableToolbar from './components/Toolbar';
import CallsTableHead from './components/Head';
import CallsTableSkeleton from './components/Skeleton';
import { Button } from '@mui/material';


function createData({id, call_type, direction, duration, from, to, via, created_at, status, action}) {
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
    action
  };
}

export default function CallsTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('direction');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [calls,setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [totalCount,setTotalCount] = useState(0);
  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(()=>{
    fetchPaginatedCalls();
  },[page, rowsPerPage])

  const fetchPaginatedCalls = async () => {
    try{
      setLoading(true);
      const calls = await getPaginatedCalls(page, rowsPerPage);
      setCalls(calls.nodes.map((call) => createData(call)));
      setHasNext(calls.hasNext);
      setTotalCount(calls.totalCount);
    } catch(e) {
      alert(JSON.stringify(e))
    } finally {
      setLoading(false);
    }
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CallsTableToolbar numSelected={selected.length} />
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
                <CallsTableSkeleton/>
              ) : calls.length === 0 ? (
                <>No Data</>
              ): (
                <TableBody>
                {calls.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
  
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
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
                        {row.call_type}
                      </TableCell>
                      <TableCell align="left">{row.direction}</TableCell>
                      <TableCell align="left">{row.duration}</TableCell>
                      <TableCell align="left">{row.from}</TableCell>
                      <TableCell align="left">{row.to}</TableCell>
                      <TableCell align="left">{row.via}</TableCell>
                      <TableCell align="left">{row.created_at}</TableCell>
                      <TableCell align="left">{row.is_archived ? 'Archived' : 'Unarchived'}</TableCell>
                      <TableCell align="left"><Button variant='contained'>View</Button></TableCell>
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
    </Box>
  );
}