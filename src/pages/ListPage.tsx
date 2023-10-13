import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableView from '../components/TableView';
import Pagination from '../components/Pagination';
import { useAppSelector } from '../redux-hooks';
import { fetchCalls, selectAllCalls, selectAllPages } from '../feature/callSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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

const ListingPage = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('All'); // Default filter option
  const limit = 10; // number of items per page
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const calls = useAppSelector(selectAllCalls);
  const totalElements = useAppSelector(selectAllPages);

  useEffect(() => {
    const offset = (page - 1) * limit;
    fetchData(offset, limit);
  }, [page]);

  const fetchData = async (offset: number, limit: number) => {
    try {
      await dispatch(fetchCalls({ offset, limit })).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCalls = calls
    ? calls.filter((call: Call) => {
        if (filter === 'All') {
          return true;
        }
        if (filter === 'Archived') {
          return call.is_archived;
        }
        if (filter === 'Unarchived') {
          return !call.is_archived;
        }
        return true;
      })
    : [];

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Layout>
          <Box m={4}>
            <Typography variant="h4" component="h1">
              Turing Technologies Frontend Test
            </Typography>
          </Box>
          <Box m={4} display="flex" alignItems="center">
            <Typography variant="subtitle2" style={{ marginRight: '16px', color: 'black' }}>
              Filter by:
            </Typography>
            <FormControl variant="outlined">
              <Select
                label="Filter by"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                style={{
                  border: 'none', 
                  color: '#4F46F8',
                }}
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Archived">Archived</MenuItem>
                <MenuItem value="Unarchived">Unarchived</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box m={4}>
            <TableView data={filteredCalls} />
          </Box>
          <Box m={4}>
            <Pagination
              currentPage={page}
              totalElements={totalElements}
              itemsPerPage={limit}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </Box>
        </Layout>
      )}
    </>
  );
};

export default ListingPage;
