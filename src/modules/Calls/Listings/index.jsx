import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { FETCH_CALLS } from '../../../graphql/query/call';

import FilterRow from './FilterRow';
import LimitChanger from './LimitChanger';
import ListingTable from './ListingTable';
import NotesModal from './NotesModal';
import Pagination from './Pagination';

const Listings = () => {
  const [values, setValues] = useState({
    limit: 10,
    offset: 0,
    selectedCallId: '',
    isModalVisible: false,
    content: '',
    filters: {}
  });

  const {
    loading: fetchingCalls,
    data: {
      paginatedCalls: {
        hasNextPage, nodes = [], totalCount
      } = {}
    } = {}
  } = useQuery(FETCH_CALLS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: values.offset,
      limit: values.limit
    }
  });
  const { filters } = values;
  const { archivedFilter, callType } = filters;

  const filterData = () => {
    if (archivedFilter && callType) {
      const isArchived = (archivedFilter === 'Archive') || false;
      return nodes.filter(({ call_type, is_archived }) => call_type === callType && is_archived === isArchived);
    } else if (archivedFilter && !callType) {
      const isArchived = (archivedFilter === 'Archive') || false;
      return nodes.filter(({ is_archived }) => is_archived === isArchived);
    } else if (!archivedFilter && callType) {
      return nodes.filter(({ call_type }) => call_type === callType);
    } else {
      return nodes;
    }
  };

  const filteredNodes = filterData();
  return (
    <div style={{ padding: '40px', height: '100%' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '40px' }}>Phone Calls</h4>
      <FilterRow
        values={values}
        setValues={setValues}
      />
      <ListingTable
        fetchingCalls={fetchingCalls}
        values={values}
        setValues={setValues}
        data={filteredNodes}
      />
      <div style={{ marginTop: '10px' }}>
        <div style={{ float: 'right', display: 'flex', columnGap: '10px' }}>
          <Pagination hasNextPage={hasNextPage} values={values} setValues={setValues} />
          <LimitChanger values={values} setValues={setValues} />
        </div>
        <div style={{ float: 'left' }}>
          Total Count: <b>{totalCount || 0}</b>
        </div>
      </div>
      <NotesModal values={values} setValues={setValues} />
    </div>
  )
};

export default Listings;