"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Pagination,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  UnfoldMore,
} from "@mui/icons-material";
import type { Call, PaginatedCalls } from "@/lib/types";
import { usePusher } from "@/lib/pusher";
import AddNoteModal from "./AddNoteModal";
import ControlPanel from "./ControlPanel";

interface CallsTableProps {
  initialData: PaginatedCalls;
}

type SortDirection = "asc" | "desc" | null;
type SortColumn =
  | "call_type"
  | "direction"
  | "duration"
  | "from"
  | "to"
  | "via"
  | "created_at"
  | "status"
  | null;

export default function CallsTable({ initialData }: CallsTableProps) {
  const [calls, setCalls] = useState<Call[]>(initialData.nodes);
  const [totalCount, setTotalCount] = useState(initialData.totalCount);
  const [hasNextPage, setHasNextPage] = useState(initialData.hasNextPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [callTypeFilter, setCallTypeFilter] = useState("All");
  const [directionFilter, setDirectionFilter] = useState("All");
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [menuCallId, setMenuCallId] = useState<string | null>(null);
  const { makeAuthenticatedRequest } = useAuth();
  const { subscribe } = usePusher();

  useEffect(() => {
    const unsubscribe = subscribe(
      "private-aircall",
      "update-call",
      (data: Call) => {
        setCalls((prevCalls) =>
          prevCalls.map((call) => (call.id === data.id ? data : call))
        );
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe]);

  // Load calls with custom rows per page
  const loadCalls = async (page: number, limit: number = rowsPerPage) => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await makeAuthenticatedRequest(
        `/calls?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();

      setCalls(data.nodes);
      setTotalCount(data.totalCount);
      setHasNextPage(data.hasNextPage);
    } catch (error) {
      console.error("Error loading calls:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    loadCalls(page, rowsPerPage);
  };

  const handleApplyFilters = () => {
    // Reset to first page when applying filters
    setCurrentPage(1);
    loadCalls(1, rowsPerPage);
  };

  const handleResetFilters = () => {
    // Reset all filters to default values
    setSearchTerm("");
    setStatusFilter("All");
    setCallTypeFilter("All");
    setDirectionFilter("All");
    setRowsPerPage(10);
    setSortColumn(null);
    setSortDirection(null);
    setCurrentPage(1);

    // Load data with default settings
    loadCalls(1, 10);
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Same column clicked - cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      // New column clicked - start with ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column: SortColumn) => {
    const iconStyle = {
      fontSize: "16px",
      position: "absolute" as const,
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
    };

    if (sortColumn !== column) {
      return <UnfoldMore sx={{ ...iconStyle, color: "#9ca3af" }} />;
    }

    if (sortDirection === "asc") {
      return <KeyboardArrowUp sx={{ ...iconStyle, color: "#6366f1" }} />;
    } else if (sortDirection === "desc") {
      return <KeyboardArrowDown sx={{ ...iconStyle, color: "#6366f1" }} />;
    }

    return <UnfoldMore sx={{ ...iconStyle, color: "#9ca3af" }} />;
  };

  const sortCalls = (calls: Call[]) => {
    if (!sortColumn || !sortDirection) return calls;

    return [...calls].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortColumn) {
        case "call_type":
          aValue = a.call_type;
          bValue = b.call_type;
          break;
        case "direction":
          aValue = a.direction;
          bValue = b.direction;
          break;
        case "duration":
          aValue = a.duration;
          bValue = b.duration;
          break;
        case "from":
          aValue = a.from;
          bValue = b.from;
          break;
        case "to":
          aValue = a.to;
          bValue = b.to;
          break;
        case "via":
          aValue = a.via;
          bValue = b.via;
          break;
        case "created_at":
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case "status":
          aValue = a.is_archived ? "archived" : "unarchive";
          bValue = b.is_archived ? "archived" : "unarchive";
          break;
        default:
          return 0;
      }

      // Handle different data types
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        if (sortDirection === "asc") {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      }
    });
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    call: Call
  ) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuCallId(call.id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuCallId(null);
  };

  const handleArchiveToggle = async (call: Call) => {
    try {
      const response = await makeAuthenticatedRequest(
        `/calls/${call.id}/archive`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle archive status");
      }

      // Update the call in the local state
      setCalls((prevCalls) =>
        prevCalls.map((c) =>
          c.id === call.id ? { ...c, is_archived: !c.is_archived } : c
        )
      );

      handleMenuClose();
    } catch (error) {
      console.error("Error toggling archive status:", error);
    }
  };

  const handleAddNoteFromMenu = (call: Call) => {
    setSelectedCall(call);
    setIsModalOpen(true);
    handleMenuClose();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds (${seconds} seconds)`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getCallTypeStyle = (callType: string) => {
    switch (callType) {
      case "voicemail":
        return { color: "#6366f1", fontWeight: 500 };
      case "answered":
        return { color: "#10b981", fontWeight: 500 };
      case "missed":
        return { color: "#ef4444", fontWeight: 500 };
      default:
        return { color: "#374151", fontWeight: 500 };
    }
  };

  const getDirectionStyle = (direction: string) => {
    return {
      color: direction === "inbound" ? "#3b82f6" : "#8b5cf6",
      fontWeight: 500,
    };
  };

  const getStatusStyle = (isArchived: boolean) => {
    return {
      color: isArchived ? "#10b981" : "#6b7280",
      fontWeight: 500,
    };
  };

  const exportToCsv = (calls: Call[]) => {
    // Define CSV headers
    const headers = [
      "Call ID",
      "Call Type",
      "Direction",
      "Duration (seconds)",
      "Duration (formatted)",
      "From",
      "To",
      "Via",
      "Created At",
      "Status",
      "Notes Count",
    ];

    // Convert calls to CSV rows
    const csvRows = calls.map((call) => [
      call.id,
      call.call_type === "voicemail" ? "Voice Mail" : call.call_type,
      call.direction,
      call.duration.toString(),
      formatDuration(call.duration),
      call.from,
      call.to,
      call.via,
      formatDate(call.created_at),
      call.is_archived ? "Archived" : "Unarchived",
      call.notes.length.toString(),
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...csvRows]
      .map((row) =>
        row.map((field) => `"${field.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);

      // Generate filename with current date and filter info
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      let filename = `calls-export-${dateStr}`;

      // Add filter info to filename
      const activeFilters = [];
      if (searchTerm) activeFilters.push("search");
      if (statusFilter !== "All")
        activeFilters.push(statusFilter.toLowerCase());
      if (callTypeFilter !== "All") activeFilters.push(callTypeFilter);
      if (directionFilter !== "All")
        activeFilters.push(directionFilter.toLowerCase());

      if (activeFilters.length > 0) {
        filename += `-${activeFilters.join("-")}`;
      }

      link.setAttribute("download", `${filename}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExportCsv = () => {
    exportToCsv(filteredAndSortedCalls);
  };

  const handleNoteAdded = () => {
    // Refresh calls to get updated notes
    loadCalls(currentPage, rowsPerPage);
  };

  // Apply all filters: search, status, call type, direction, then sort
  const filteredAndSortedCalls = sortCalls(
    calls.filter((call) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          call.from.toLowerCase().includes(searchLower) ||
          call.to.toLowerCase().includes(searchLower) ||
          call.via.toLowerCase().includes(searchLower) ||
          call.call_type.toLowerCase().includes(searchLower) ||
          call.direction.toLowerCase().includes(searchLower) ||
          formatDate(call.created_at).toLowerCase().includes(searchLower) ||
          formatDuration(call.duration).toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "All") {
        if (statusFilter === "Archived" && !call.is_archived) return false;
        if (statusFilter === "Unarchived" && call.is_archived) return false;
      }

      // Call type filter
      if (callTypeFilter !== "All" && call.call_type !== callTypeFilter)
        return false;

      // Direction filter
      if (directionFilter !== "All" && call.direction !== directionFilter)
        return false;

      return true;
    })
  );

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <Box
      sx={{
        padding: "40px",
        backgroundColor: "background.default",
        minHeight: "100vh",
        color: "text.primary",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "32px",
          color: "text.primary",
          fontSize: "32px",
          fontWeight: 900,
          lineHeight: 1.2,
          fontFamily: '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
        }}
      >
        Turing Technologies Frontend Test
      </Typography>

      <ControlPanel
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        callTypeFilter={callTypeFilter}
        onCallTypeFilterChange={setCallTypeFilter}
        directionFilter={directionFilter}
        onDirectionFilterChange={setDirectionFilter}
        onExportCsv={handleExportCsv}
        filteredCount={filteredAndSortedCalls.length}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        isLoading={loading}
      />

      <TableContainer
        component={Paper}
        sx={{
          marginBottom: "24px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb !important" }}>
              <TableCell
                onClick={() => handleSort("call_type")}
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                  cursor: "pointer",
                  userSelect: "none",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f9fafb !important",
                  },
                }}
              >
                CALL TYPE
                {getSortIcon("call_type")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("direction")}
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                  cursor: "pointer",
                  userSelect: "none",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f9fafb !important",
                  },
                }}
              >
                DIRECTION
                {getSortIcon("direction")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("duration")}
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                  cursor: "pointer",
                  userSelect: "none",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f9fafb !important",
                  },
                }}
              >
                DURATION
                {getSortIcon("duration")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("from")}
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                  cursor: "pointer",
                  userSelect: "none",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f9fafb !important",
                  },
                }}
              >
                FROM
                {getSortIcon("from")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("to")}
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                  cursor: "pointer",
                  userSelect: "none",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f9fafb !important",
                  },
                }}
              >
                TO
                {getSortIcon("to")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("via")}
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                  cursor: "pointer",
                  userSelect: "none",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f9fafb !important",
                  },
                }}
              >
                VIA
                {getSortIcon("via")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("created_at")}
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                  cursor: "pointer",
                  userSelect: "none",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f9fafb !important",
                  },
                }}
              >
                CREATED AT
                {getSortIcon("created_at")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("status")}
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                  cursor: "pointer",
                  userSelect: "none",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f9fafb !important",
                  },
                }}
              >
                STATUS
                {getSortIcon("status")}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "#374151 !important",
                  backgroundColor: "#f9fafb !important",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "16px",
                  fontFamily:
                    '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
                }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedCalls.map((call, index) => (
              <TableRow
                key={call.id}
                sx={{
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f9fafb" },
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <TableCell sx={{ padding: "16px" }}>
                  <Typography
                    sx={{
                      ...getCallTypeStyle(call.call_type),
                      fontSize: "14px",
                      textTransform: "capitalize",
                      fontFamily:
                        '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                    }}
                  >
                    {call.call_type === "voicemail"
                      ? "Voice Mail"
                      : call.call_type}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px" }}>
                  <Typography
                    sx={{
                      ...getDirectionStyle(call.direction),
                      fontSize: "14px",
                      textTransform: "capitalize",
                      fontFamily:
                        '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                    }}
                  >
                    {call.direction}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#374151",
                      fontFamily:
                        '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                    }}
                  >
                    {formatDuration(call.duration)}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px",
                    fontSize: "14px",
                    color: "#374151",
                    fontFamily:
                      '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  }}
                >
                  {call.from}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px",
                    fontSize: "14px",
                    color: "#374151",
                    fontFamily:
                      '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  }}
                >
                  {call.to}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px",
                    fontSize: "14px",
                    color: "#374151",
                    fontFamily:
                      '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  }}
                >
                  {call.via}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px",
                    fontSize: "14px",
                    color: "#374151",
                    fontFamily:
                      '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  }}
                >
                  {formatDate(call.created_at)}
                </TableCell>
                <TableCell sx={{ padding: "16px" }}>
                  <Typography
                    sx={{
                      ...getStatusStyle(call.is_archived),
                      fontSize: "14px",
                      fontFamily:
                        '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                    }}
                  >
                    {call.is_archived ? "Archived" : "Unarchive"}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px" }}>
                  <IconButton
                    onClick={(event) => handleMenuClick(event, call)}
                    sx={{
                      color: "#6b7280",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                    }}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          disabled={loading}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#6b7280",
              fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
              "&.Mui-selected": {
                backgroundColor: "#6366f1",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5855eb",
                },
              },
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            },
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            color: "text.secondary",
            fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
          }}
        >
          Showing {Math.min(rowsPerPage, filteredAndSortedCalls.length)} of{" "}
          {totalCount} results ({rowsPerPage} per page)
        </Typography>
      </Box>

      {/* Actions Dropdown Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            minWidth: "200px",
          },
        }}
      >
        {menuCallId && (
          <>
            <MenuItem
              onClick={() => {
                const call = calls.find((c) => c.id === menuCallId);
                if (call) handleArchiveToggle(call);
              }}
              sx={{
                padding: "12px 16px",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      calls.find((c) => c.id === menuCallId)?.is_archived ||
                      false
                    }
                    size="small"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#10b981",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#10b981",
                        },
                    }}
                  />
                }
                label={
                  <span className="text-sm font-avenir-roman">
                    {calls.find((c) => c.id === menuCallId)?.is_archived
                      ? "Unarchive"
                      : "Archive"}
                  </span>
                }
                sx={{ margin: 0 }}
              />
            </MenuItem>
            <MenuItem
              onClick={() => {
                const call = calls.find((c) => c.id === menuCallId);
                if (call) handleAddNoteFromMenu(call);
              }}
              sx={{
                padding: "12px 16px",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                fontSize: "14px",
              }}
            >
              Add Note
            </MenuItem>
          </>
        )}
      </Menu>

      <AddNoteModal
        open={isModalOpen}
        call={selectedCall}
        onClose={() => setIsModalOpen(false)}
        onNoteAdded={handleNoteAdded}
      />
    </Box>
  );
}
