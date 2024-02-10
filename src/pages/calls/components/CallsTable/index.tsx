import { useEffect, useState } from 'react';
import { useModal } from '@/lib/hooks';
import { getCallsAsync } from '@/features/api';
import { useCallsContext } from '@/pages/calls/hooks';
import { CALL_STATUS_FILTERS } from '@/constants';
import { Call } from '@/models';
import {
  Backdrop,
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import { AddNoteForm, CallRow, FilterDropdown, TableHeader } from './components';

export function CallsTable() {
  const [openModal, modalDetails] = useModal('add-note');

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [statusFilter, setStatusFilter] = useState(CALL_STATUS_FILTERS[0]);

  const { setSelectedCall, data, setData } = useCallsContext();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handleAddNoteClick = (call: Call) => {
    setSelectedCall(call);
    openModal();
  };

  useEffect(() => {
    const fetchCalls = async () => {
      setIsLoading(true);
      const data = await getCallsAsync(page);
      if (data) {
        setData(data);
      }
      setIsLoading(false);
    };

    void fetchCalls();
  }, [page]);

  let rows = data?.nodes || [];

  if (statusFilter !== 'all') {
    rows = rows.filter((i) => (statusFilter === 'archived' ? i.is_archived : !i.is_archived));
  }

  rows = rows.sort((a, b) => {
    const aDate = new Date(a.created_at).getTime();
    const bDate = new Date(b.created_at).getTime();

    return bDate - aDate;
  });

  const currentRows = (page + 1) * rowsPerPage;

  return (
    <>
      <AddNoteForm modalDetails={modalDetails} />
      <FilterDropdown setStatusFilter={setStatusFilter} statusFilter={statusFilter} />

      {/* Table */}
      <TableContainer component={Paper}>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Table sx={{ minWidth: 500 }} aria-label="calls table">
          <TableHeader />

          <TableBody>
            {rows.map((row) => {
              const onAddNoteClick = () => handleAddNoteClick(row);

              return <CallRow call={row} key={row.id} handleAddNoteClick={onAddNoteClick} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Pagination */}
      <Pagination
        sx={{
          mx: 'auto',
          mt: 4,
          '& > .MuiPagination-ul': {
            gap: 2,
          },
        }}
        color="primary"
        size="small"
        count={Math.floor((data?.totalCount || 10) / 10)}
        page={page + 1}
        onChange={handlePageChange}
        shape="rounded"
      />
      <Box sx={{ mx: 'auto' }}>
        <Typography>
          {currentRows - 9} - {currentRows} of {data?.totalCount} results
        </Typography>
      </Box>
    </>
  );
}
