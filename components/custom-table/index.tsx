"use client";

import { useRef, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Pagination,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Box,
  Typography,
} from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import type { CustomTableProps } from "./custom-table.types";

import { StyledTableCell, StyledTableRow, styles } from "./custom-table.styles";

import { TableSkeleton, IsFetching, NoContentFound } from "@components";

// ----------------------------------------------------------------------
// constant
const EMPTY_ARRAY: [] = [];

const cellFunction = (info: any): JSX.Element => {
  return <Box>{Number(info?.row?.id) + 1}</Box>;
};

const headerFunction = (): JSX.Element => <Box>Sr.</Box>;

export function CustomTable({
  columns,
  data,
  isFetching = false,
  isLoading = false,
  isError = false,
  isSuccess = false,
  totalCount = 0,
  totalPages = 0,
  currentPage = 0,
  limit = 0,
  onPageChange,
  onSortByChange,
  isPagination = true,
  tableContainerSX = {},
  rootSX = {},
  showSerialNo = false,
  onSelected = () => {
    return null;
  },
}: CustomTableProps): JSX.Element {
  //STATS USE THEMES....

  const [rowSelection, setRowSelection] = useState({});

  const theme = useTheme();
  let columnsData = columns;
  // Handling sort using useRef
  const refSortData = (() => {
    const sortDataMap: any = {};
    for (const colData of columns) {
      if (colData.isSortable) sortDataMap[colData.id] = 0;
    }
    return sortDataMap;
  })();

  const sortRef = useRef(refSortData);

  const handleSortBy: any = (colId: string) => {
    sortRef.current[colId]++;
    if (sortRef.current[colId] % 2 === 1)
      onSortByChange({ id: colId, sortOrder: 1 });
    else onSortByChange({ id: colId, sortOrder: -1 });
  };

  const isSorted: any = (colId: string) => {
    return sortRef.current[colId] % 2 === 1;
  };
  if (showSerialNo) {
    columnsData = [
      {
        accessorFn: (row: any) => row,
        id: "srNo",
        cell: (info) => cellFunction(info),
        header: () => headerFunction(),
        isSortable: false,
      },
      ...columns,
    ];
  } else null;

  const table = useReactTable({
    data: data ?? EMPTY_ARRAY,
    columns: columnsData,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  onSelected(table.getSelectedRowModel().flatRows);
  if (isLoading) return <TableSkeleton />;

  return (
    <Grid container sx={{ position: "relative", ...rootSX }}>
      <IsFetching isFetching={isFetching} />
      <Grid xs={12} item>
        {/* Table Container */}
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer sx={styles.tableContainer(tableContainerSX, theme)}>
            <Table stickyHeader>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <StyledTableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => (
                      <StyledTableCell key={header.id}>
                        <Box
                          onClick={() =>
                            header.column.columnDef.isSortable &&
                            handleSortBy(header?.id)
                          }
                          sx={styles.cell}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {header.column.columnDef.isSortable &&
                            !isSorted(header.id) && <KeyboardArrowDownIcon />}
                          {header.column.columnDef.isSortable &&
                            isSorted(header.id) && <KeyboardArrowUpIcon />}
                        </Box>
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableHead>

              {isSuccess && table.getRowModel().rows.length > 0 && (
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <StyledTableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <StyledTableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            {(isError || table.getRowModel().rows.length === 0) && (
              <Grid container sx={styles.error(theme)}>
                <Grid item width={200}>
                  <NoContentFound />
                </Grid>
              </Grid>
            )}
          </TableContainer>
        </Box>

        {/* Pagination */}
        <Grid container>
          <Grid xs={12} item>
            {isSuccess &&
              Boolean(table?.getRowModel()?.rows?.length) &&
              isPagination && (
                <Box sx={styles.currentPageBox}>
                  <Pagination
                    sx={styles.pagination}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: () => <>Previous</>,
                          next: () => <>Next</>,
                        }}
                        {...item}
                      />
                    )}
                    size="medium"
                    variant="outlined"
                    shape="rounded"
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => {
                      onPageChange(page);
                    }}
                  />
                  <Typography
                    sx={{
                      variant: "body1",
                    }}
                  >
                    Showing {(currentPage - 1) * limit + 1} {"-"}
                    {currentPage * limit} of {totalCount}
                  </Typography>
                </Box>
              )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
