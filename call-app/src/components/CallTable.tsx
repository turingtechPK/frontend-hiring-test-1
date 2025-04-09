"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Pagination,
  SelectChangeEvent,
  TableRow,
  TableCell,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_PAGINATED_CALLS } from "@/features/calls/graphql/calls";
import { CallStatusFilter } from "./CallFilter";
import { Call } from "@/types";
import TableContent from "./TableContent";
import AddNoteModal from "./AddNoteModal";
import TableColumnNames from "./TableHeader";
import { ITEMS_PER_PAGE } from "@/constants";

export default function CallTable() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [allCalls, setAllCalls] = useState<Call[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  const [paginatedCalls, setPaginatedCalls] = useState<Call[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch all calls at once for client-side filtering
  const {
    data,
    error,
    loading: queryLoading,
  } = useQuery(GET_PAGINATED_CALLS, {
    variables: { offset: 0, limit: 1000 }, // Fetch a large number to get all calls
    fetchPolicy: "cache-and-network",
  });

  // Update allCalls when data changes
  useEffect(() => {
    if (data?.paginatedCalls?.nodes) {
      setAllCalls(data.paginatedCalls.nodes);
      setLoading(false);
    }
  }, [data]);

  // Apply filter whenever statusFilter or allCalls changes
  useEffect(() => {
    const filtered =
      statusFilter === "all"
        ? allCalls
        : allCalls.filter((call: Call) =>
            statusFilter === "archived" ? call.is_archived : !call.is_archived
          );

    setFilteredCalls(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setPage(1);
  }, [statusFilter, allCalls]);

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    setPaginatedCalls(
      filteredCalls.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    );
  }, [page, filteredCalls]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  const openAddNoteModal = (callId: string) => {
    setSelectedCallId(callId);
  };

  const closeCallDetailModal = () => {
    setSelectedCallId(null);
  };

  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: "light" }}>
        Turing Technologies Frontend Test
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <CallStatusFilter
          statusFilter={statusFilter}
          onFilterChange={handleFilterChange}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 1, boxShadow: 1, mt: 1 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f4f4f9" }}>
            <TableColumnNames />
          </TableHead>

          <TableBody>
            {loading || queryLoading ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 10 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <TableContent
                filteredCalls={paginatedCalls}
                onAddNote={openAddNoteModal}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#5071EA",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#5071EA",
                color: "white",
              },
            }}
          />
        </Box>
      )}
      {/* Modal */}
      {selectedCallId && (
        <AddNoteModal
          open={Boolean(selectedCallId)}
          onClose={closeCallDetailModal}
          callId={selectedCallId}
        />
      )}
    </Box>
  );
}
