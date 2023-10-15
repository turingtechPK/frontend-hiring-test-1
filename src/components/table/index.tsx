'use client'

import { CallTableColumns } from '@/features/CallsTable'
import { createArrayFrom1ToN } from '@/lib/helpers'
import { Call } from '@/lib/types'
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Button, Flex } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'
import * as Styled from './table.styles'
import { ChevronLeft } from '@/app/assets/icons/ChevronLeft'
import { ChevronRight } from '@/app/assets/icons/ChevronRight'

interface TableProps {
  columns: ColumnDef<CallTableColumns, any>[]
  data: Call[]
  pageCount: number
  pagination: PaginationState
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>
  totalCount: number
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  pageCount,
  pagination,
  onPaginationChange,
  totalCount,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange,
    manualPagination: true,
  })

  return (
    <>
      <Styled.Table>
        <Styled.TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <Styled.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Styled.TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Styled.TableHead>
              ))}
            </Styled.TableRow>
          ))}
        </Styled.TableHeader>
        <Styled.TableBody>
          {table.getRowModel().rows.map((row) => (
            <Styled.TableBodyRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Styled.TableData type={cell.getValue() as any} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Styled.TableData>
              ))}
            </Styled.TableBodyRow>
          ))}
        </Styled.TableBody>
      </Styled.Table>
      <Styled.PaginationWrapper>
        <Flex justify="center" align="center" gap={14}>
          <Styled.PaginationArrows onClick={() => table.previousPage()}>
            <ChevronLeft />
          </Styled.PaginationArrows>
          <Flex gap={14}>
            {createArrayFrom1ToN(table.getPageCount()).map((pageNumber, index) => (
              <Styled.PaginationButton
                key={`table-pageNumber-${index}`}
                onClick={() => table.setPageIndex(index)}
                active={pagination.pageIndex === index}
              >
                {pageNumber}
              </Styled.PaginationButton>
            ))}
          </Flex>
          <Styled.PaginationArrows onClick={() => table.nextPage()}>
            <ChevronRight />
          </Styled.PaginationArrows>
        </Flex>
        <Flex justify="center" align="center">
          {pagination.pageIndex + 1}-
          {pagination.pageIndex + 9 <= totalCount
            ? pagination.pageIndex + 9
            : pagination.pageIndex + 9 - totalCount}{' '}
          of {totalCount}
        </Flex>
      </Styled.PaginationWrapper>
    </>
  )
}
