/* eslint-disable react/no-array-index-key */

import type { Call, CallType } from '@/api/types';
import {
  CALL_TYPE_FILTER_OPTIONS,
  DEFAULT_CALL_TYPE_FILTER_VALUE,
  DEFAULT_STATUS_FILTER_VALUE,
  STATUS_FILTER_OPTIONS,
} from '@/utils/constants';
import { useContext, useEffect, useState } from 'react';
import { CallsContext } from '@/contexts';
import { getCalls } from '@/api';
import Dropdown from '../ui/Dropdown';
import AddNotesModal from './AddNotesModal';
import Table, { Column } from '../ui/Table';
import CallTypeCell from './CallTypeCell';
import DurationCell from './DurationCell';
import AddNoteCell from './AddNoteCell';
import Button from '../ui/Button';
import ChevronDownIcon from '../icons/ChevronDown';
import CallDetailsModal from './CallDetailsModal';

const CALLS_COLUMNS: Column<Call>[] = [
  {
    key: 'call_type',
    displayHeader: 'Call type',
    size: 3,
    format(value: CallType) {
      return <CallTypeCell value={value} />;
    },
  },
  {
    key: 'direction',
    displayHeader: 'Direction',
    size: 2,
    format(value: string) {
      return <span className="text-primary capitalize">{value}</span>;
    },
  },
  {
    key: 'duration',
    displayHeader: 'Duration',
    size: 4,
    format(value: number) {
      return <DurationCell value={value} />;
    },
  },
  {
    key: 'from',
    displayHeader: 'From',
    size: 3,
  },
  {
    key: 'to',
    displayHeader: 'To',
    size: 3,
  },
  {
    key: 'via',
    displayHeader: 'Via',
    size: 3,
  },
  {
    key: 'created_at',
    displayHeader: 'Created at',
    size: 3,
    format(value: string) {
      const formattedString = new Date(value).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      return formattedString.replaceAll('/', '-');
    },
  },
  {
    key: 'is_archived',
    displayHeader: 'Status',
    size: 2,
    format(value) {
      const display = value ? 'Archived' : 'Unarchived';
      return (
        <span
          className={
            value ? 'bg-green-100 text-green-800 px-2 py-1' : 'bg-gray-100 text-gray-700 px-2 py-1'
          }
        >
          {display}
        </span>
      );
    },
  },
  {
    key: 'id',
    displayHeader: 'Actions',
    size: 3,
    format(value, rowData) {
      return <AddNoteCell rowData={rowData} />;
    },
  },
];

export default function CallsTable() {
  const [page, setPage] = useState(1);
  const { data, setData, setDetailsItem } = useContext(CallsContext);
  const [statusfilter, setStatusFilter] = useState(DEFAULT_STATUS_FILTER_VALUE);
  const [callTypeFilter, setCallTypeFilter] = useState(DEFAULT_CALL_TYPE_FILTER_VALUE);

  useEffect(() => {
    const fetchCalls = async () => {
      const response = await getCalls(page - 1);

      if (response !== null) {
        setData(response);
      }
    };

    fetchCalls();
  }, [page]);

  let filteredData = data?.nodes;

  if (statusfilter !== DEFAULT_STATUS_FILTER_VALUE) {
    filteredData = filteredData?.filter((item) =>
      statusfilter === 'archived' ? item.is_archived : !item.is_archived
    );
  }

  if (callTypeFilter !== DEFAULT_CALL_TYPE_FILTER_VALUE) {
    filteredData = filteredData?.filter((item) => item.call_type === callTypeFilter);
  }

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 10) : 1;

  return (
    <>
      <div className="flex gap-4 items-center">
        <p>Filter by:</p>
        <Dropdown
          options={STATUS_FILTER_OPTIONS}
          defaultValue={DEFAULT_STATUS_FILTER_VALUE}
          onChange={setStatusFilter}
        />

        <Dropdown
          options={CALL_TYPE_FILTER_OPTIONS}
          defaultValue={DEFAULT_CALL_TYPE_FILTER_VALUE}
          onChange={setCallTypeFilter}
        />
      </div>

      <div className="py-10 flex flex-col overflow-x-scroll">
        <Table
          data={filteredData}
          columns={CALLS_COLUMNS}
          onRowClick={(rowData) => setDetailsItem(rowData)}
        />
      </div>

      <div className="flex flex-col gap-2 items-center mt-4">
        <div className="flex gap-2">
          <Button
            size="small"
            color="icon"
            onClick={() => {
              if (page > 1) setPage((p) => p - 1);
            }}
            disabled
          >
            <span className="inline-flex size-5 rotate-90 fill-slate-700 hover:fill-primary">
              <ChevronDownIcon />
            </span>
          </Button>

          {Array.from(Array(totalPages).keys()).map((p) => (
            <Button
              key={`page-button-${p}`}
              size="small"
              color={page === p + 1 ? 'primary' : 'text'}
              onClick={() => setPage(p + 1)}
            >
              {p + 1}
            </Button>
          ))}
          <Button
            size="small"
            color="icon"
            onClick={() => {
              if (page < totalPages) setPage((p) => p + 1);
            }}
            disabled
          >
            <span className="inline-flex size-5 -rotate-90 fill-slate-700 hover:fill-primary">
              <ChevronDownIcon />
            </span>
          </Button>
        </div>
        <div className="">
          {data?.totalCount && data.totalCount > 0
            ? `${(page - 1) * 10 + 1} - ${Math.min(page * 10, data.totalCount)} of ${
                data.totalCount
              } results`
            : '0 results'}
        </div>
      </div>

      <AddNotesModal />
      <CallDetailsModal />
    </>
  );
}
