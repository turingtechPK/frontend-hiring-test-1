'use client'

import { Table } from '@/components/table'
import { ActionButton } from '@/components/table/table.styles'
import { capitalizeFirstLetter } from '@/lib/helpers'
import { Call } from '@/lib/types'
import { getCalls, postNote } from '@/services/requests/calls'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PaginationState, createColumnHelper } from '@tanstack/react-table'
import { Modal } from 'antd'
import clsx from 'clsx'
import moment from 'moment'
import momentDuration from 'moment-duration-format'
import { useCallback, useMemo, useState } from 'react'
import { ModalHeader, ModalInfoGrid } from './CallsTable.style'
import TextArea from 'antd/es/input/TextArea'

momentDuration(moment as any)

export type CallTableColumns = Omit<Call, 'notes'>

type Props = {
  filterValue: string | null
}

export const CallsTable: React.FC<Props> = ({ filterValue }) => {
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
      console.log('a', value)
      console.log('b', filterValue)
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
        return (
          <div
            className={clsx('badge', {
              archived: info.getValue(),
            })}
          >
            {info.getValue() ? 'Archived' : 'Unarchived'}
          </div>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        const call = info.row.original
        const [value, setValue] = useState<string>('')
        const [error, setError] = useState<string>('')
        const [isModalOpen, setIsModalOpen] = useState(false)
        const mutation = useMutation({
          mutationFn: () => postNote({ id: call.id, content: value }),
          onSuccess: () => {
            setValue('')
            setIsModalOpen(false)
          },
        })
        const handleOk = () => {
          if (value.length > 0) {
            setError('')
            mutation.mutate()
          } else {
            setError('error')
          }
        }
        const handleCancel = () => {
          setIsModalOpen(false)
        }
        return (
          <div>
            <ActionButton
              onClick={() => {
                setIsModalOpen(true)
              }}
            >
              Add Note
            </ActionButton>
            <Modal
              title="Add Notes"
              open={isModalOpen}
              okText="Save"
              onOk={handleOk}
              destroyOnClose
              onCancel={handleCancel}
            >
              <ModalHeader>Call ID {call.id}</ModalHeader>
              <ModalInfoGrid>
                <div>Call Type</div>
                <div>{call.call_type}</div>
                <div>Duration</div>
                <div>
                  {moment
                    .duration(call.duration, 'seconds')
                    .format('hh [hours] mm [minutes]')}
                </div>
                <div>FROM</div>
                <div>{call.from}</div>
                <div>TO</div>
                <div>{call.to}</div>
                <div>VIA</div>
                <div>{call.via}</div>
              </ModalInfoGrid>
              <div>
                <div>Notes</div>
                <TextArea
                  rows={4}
                  value={value}
                  placeholder="Add Notes"
                  onChange={(e) => setValue(e.target.value)}
                  status={error as any}
                  style={{ resize: 'none' }}
                />
              </div>
            </Modal>
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
