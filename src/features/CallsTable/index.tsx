'use client'

import { Table } from '@/components/table'
import { ActionButton } from '@/components/table/table.styles'
import { capitalizeFirstLetter } from '@/lib/helpers'
import { Call } from '@/lib/types'
import { getCalls, postNote, updateCall } from '@/services/requests/calls'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PaginationState, createColumnHelper } from '@tanstack/react-table'
import { Modal, Popconfirm } from 'antd'
import clsx from 'clsx'
import moment from 'moment'
import momentDuration from 'moment-duration-format'
import { useCallback, useMemo, useState } from 'react'
import { ModalHeader, ModalInfoGrid } from './CallsTable.style'
import TextArea from 'antd/es/input/TextArea'
import { CallInfoModal } from '../CallInfoModal'
import { produce } from 'immer'

momentDuration(moment as any)

export type CallTableColumns = Omit<Call, 'notes'>

type Props = {
  filterValue: string | null
}

export const CallsTable: React.FC<Props> = ({ filterValue }) => {
  const queryClient = useQueryClient()

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })
  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }
  const dataQuery = useQuery(
    ['callsPaginated', fetchDataOptions],
    () => getCalls(fetchDataOptions),
    { keepPreviousData: true },
  )
  const filteredData = () => {
    if (!filterValue) return dataQuery.data?.nodes ?? []
    return dataQuery.data?.nodes.filter((call) => {
      const value = call.is_archived ? 'archived' : 'unarchived'
      return value === filterValue
    })
  }

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )
  const getPageCount = useCallback(() => {
    if (dataQuery.data?.totalCount === undefined) return -1
    return Math.ceil(dataQuery.data?.totalCount / pageSize)
  }, [dataQuery.data?.totalCount, pageSize])

  const updateCallMutation = useMutation({
    mutationFn: updateCall,
    onMutate: async (data) => {
      await queryClient.invalidateQueries(['callsPaginated', fetchDataOptions])
      queryClient.setQueryData(['callsPaginated', fetchDataOptions], (old: any) =>
        produce(old, (draft: any) => {
          const callToUpdate = draft.nodes?.find((call: Call) => call.id === data)
          callToUpdate.is_archived = !callToUpdate.is_archived
        }),
      )
    },
    onSuccess(data, variables, context) {
      dataQuery.refetch()
    },
    onError() {
      dataQuery.refetch()
    },
  })
  const columnHelper = createColumnHelper<CallTableColumns>()

  const defaultColumns = [
    columnHelper.accessor((row) => row.call_type, {
      id: 'Call Type',
      cell: (info) => <div>{capitalizeFirstLetter(info.getValue())}</div>,
    }),
    columnHelper.accessor('direction', {
      cell: (info) => <div>{capitalizeFirstLetter(info.getValue())}</div>,
    }),
    columnHelper.accessor('duration', {
      cell: (info) => {
        const duration = moment.duration(info.getValue(), 'seconds')
        const formatted = duration.format('H [hours] mm [minutes]')
        return (
          <div>
            <div>{formatted}</div>
            <div className="subText">({duration.format('ss')} seconds)</div>
          </div>
        )
      },
    }),
    columnHelper.accessor('from', {
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('to', {
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('via', {
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor((row) => row.created_at, {
      id: 'Created At',
      cell: (info) => <div>{moment(info.getValue()).format('MM-DD-YYYY')}</div>,
    }),
    columnHelper.accessor((row) => row.is_archived, {
      id: 'status',
      cell: (info) => {
        const status = info.getValue()
        return (
          <Popconfirm
            title={'Confirm Action!'}
            description={`Are you sure you want to ${
              status ? 'unarchive' : 'archive'
            } this call?`}
            className={clsx('badge', {
              archived: info.getValue(),
            })}
            style={{ cursor: 'pointer' }}
            okText="Yes"
            cancelText="No"
            onConfirm={() => updateCallMutation.mutate(info.row.original.id)}
          >
            {info.getValue() ? 'Archived' : 'Unarchived'}
          </Popconfirm>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        const call = info.row.original

        return (
          <div>
            <CallInfoModal call={call} />
          </div>
        )
      },
    }),
  ]

  return (
    <>
      <Table
        columns={defaultColumns}
        data={filteredData() || []}
        pageCount={getPageCount()}
        pagination={pagination}
        onPaginationChange={setPagination}
        totalCount={dataQuery.data?.totalCount ?? 0}
      />
    </>
  )
}
