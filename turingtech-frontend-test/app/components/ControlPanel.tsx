"use client";

import React from "react";

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Search,
  Hash,
  Archive,
  Phone,
  ArrowUpDown,
  Settings,
  RotateCcw,
  Download,
} from "lucide-react";

interface ControlPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  callTypeFilter: string;
  onCallTypeFilterChange: (value: string) => void;
  directionFilter: string;
  onDirectionFilterChange: (value: string) => void;
  onExportCsv: () => void;
  filteredCount: number;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  isLoading: boolean;
}

export default function ControlPanel({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  callTypeFilter,
  onCallTypeFilterChange,
  directionFilter,
  onDirectionFilterChange,
  onExportCsv,
  filteredCount,
  rowsPerPage,
  onRowsPerPageChange,
  onApplyFilters,
  onResetFilters,
  isLoading,
}: ControlPanelProps) {
  const [statusAnchorEl, setStatusAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [callTypeAnchorEl, setCallTypeAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [directionAnchorEl, setDirectionAnchorEl] =
    useState<HTMLElement | null>(null);
  const [rowsInputValue, setRowsInputValue] = useState(rowsPerPage.toString());

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleCallTypeClick = (event: React.MouseEvent<HTMLElement>) => {
    setCallTypeAnchorEl(event.currentTarget);
  };

  const handleDirectionClick = (event: React.MouseEvent<HTMLElement>) => {
    setDirectionAnchorEl(event.currentTarget);
  };

  const closeAllMenus = () => {
    setStatusAnchorEl(null);
    setCallTypeAnchorEl(null);
    setDirectionAnchorEl(null);
  };

  const handleStatusSelect = (value: string) => {
    onStatusFilterChange(value);
    closeAllMenus();
  };

  const handleCallTypeSelect = (value: string) => {
    onCallTypeFilterChange(value);
    closeAllMenus();
  };

  const handleDirectionSelect = (value: string) => {
    onDirectionFilterChange(value);
    closeAllMenus();
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setRowsInputValue(value);

    // Only update the parent state if it's a valid number between 1 and 100
    const numValue = Number.parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      onRowsPerPageChange(numValue);
    }
  };

  const handleRowsPerPageBlur = () => {
    // Reset to current valid value if input is invalid
    const numValue = Number.parseInt(rowsInputValue, 10);
    if (isNaN(numValue) || numValue < 1 || numValue > 100) {
      setRowsInputValue(rowsPerPage.toString());
    }
  };

  // Update local input when parent rowsPerPage changes (e.g., from reset)
  React.useEffect(() => {
    setRowsInputValue(rowsPerPage.toString());
  }, [rowsPerPage]);

  const getFilterDisplayName = (filterType: string, value: string) => {
    if (value === "All") return "All";

    switch (filterType) {
      case "status":
        return value === "Archived"
          ? "Archived"
          : value === "Unarchived"
          ? "Unarchived"
          : "All";
      case "callType":
        return value === "voicemail"
          ? "Voice Mail"
          : value === "answered"
          ? "Answered"
          : value === "missed"
          ? "Missed"
          : "All";
      case "direction":
        return value === "inbound"
          ? "Inbound"
          : value === "outbound"
          ? "Outbound"
          : "All";
      default:
        return "All";
    }
  };

  const renderDropdownMenu = (
    anchorEl: HTMLElement | null,
    options: { value: string; label: string }[],
    currentValue: string,
    onSelect: (value: string) => void
  ) => {
    if (!anchorEl) return null;

    return (
      <Box
        sx={{
          position: "absolute",
          top: anchorEl.getBoundingClientRect().bottom + window.scrollY + 4,
          left: anchorEl.getBoundingClientRect().left,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #334155 0%, #475569 50%, #64748b 100%)"
              : "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #ddd6fe 100%)",
          borderRadius: "8px",
          minWidth: "140px",
          boxShadow:
            "0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -3px rgba(0, 0, 0, 0.05)",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid #475569"
              : "1px solid #c7d2fe",
          zIndex: 1000,
          backdropFilter: "blur(10px)",
        }}
      >
        {options.map((option) => (
          <Box
            key={option.value}
            onClick={() => onSelect(option.value)}
            sx={{
              backgroundColor:
                currentValue === option.value
                  ? "rgba(99, 102, 241, 0.2)"
                  : "transparent",
              fontSize: "14px",
              padding: "10px 16px",
              fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
              cursor: "pointer",
              borderRadius: currentValue === option.value ? "6px" : "0",
              margin: currentValue === option.value ? "2px" : "0",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                borderRadius: "6px",
                margin: "2px",
              },
              "&:first-of-type": {
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              },
              "&:last-of-type": {
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              },
            }}
          >
            {option.label}
          </Box>
        ))}
      </Box>
    );
  };

  const statusOptions = [
    { value: "All", label: "All" },
    { value: "Archived", label: "Archived" },
    { value: "Unarchived", label: "Unarchived" },
  ];

  const callTypeOptions = [
    { value: "All", label: "All" },
    { value: "voicemail", label: "Voice Mail" },
    { value: "answered", label: "Answered" },
    { value: "missed", label: "Missed" },
  ];

  const directionOptions = [
    { value: "All", label: "All" },
    { value: "inbound", label: "Inbound" },
    { value: "outbound", label: "Outbound" },
  ];

  return (
    <>
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)"
              : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid #334155"
              : "1px solid #e2e8f0",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: "12px",
            color: "text.primary", // Changed from hardcoded color
            fontSize: "16px",
            fontWeight: 900,
            fontFamily: '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
            display: "flex",
            alignItems: "center",
          }}
        >
          <Settings className="w-4 h-4 mr-2 text-indigo-600" />
          Control Panel
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "end",
          }}
        >
          {/* Search Bar */}
          <Box sx={{ flex: "1 1 280px", minWidth: "280px" }}>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "6px",
                color: "text.primary",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: '"AvenirLTStd-Book", "Avenir LT Std", sans-serif',
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search className="w-3 h-3 mr-1" />
              Search
            </Typography>
            <TextField
              placeholder="Search calls..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontFamily:
                    '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  fontSize: "14px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  height: "40px",
                  backdropFilter: "blur(5px)",
                  color: "#374151",
                  "& input::placeholder": {
                    color: "#6b7280",
                  },
                  "& fieldset": {
                    borderColor: "#cbd5e1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94a3b8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366f1",
                  },
                },
              }}
            />
          </Box>

          {/* Divider */}
          <Box
            sx={{
              height: "50px",
              width: "1px",
              backgroundColor: "#cbd5e1",
              margin: "0 4px",
            }}
          />

          {/* Rows Per Page */}
          <Box sx={{ flex: "0 0 auto" }}>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "6px",
                color: "text.primary",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: '"AvenirLTStd-Book", "Avenir LT Std", sans-serif',
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Hash className="w-3 h-3 mr-1" />
              Rows
            </Typography>
            <TextField
              type="number"
              value={rowsInputValue}
              onChange={handleRowsPerPageChange}
              onBlur={handleRowsPerPageBlur}
              size="small"
              inputProps={{
                min: 1,
                max: 100,
                style: { textAlign: "center", width: "50px" },
              }}
              sx={{
                width: "70px",
                "& .MuiOutlinedInput-root": {
                  fontFamily:
                    '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  fontSize: "14px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  height: "40px",
                  color: "#374151",
                  "& fieldset": {
                    borderColor: "#cbd5e1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94a3b8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366f1",
                  },
                },
              }}
            />
          </Box>

          {/* Divider */}
          <Box
            sx={{
              height: "50px",
              width: "1px",
              backgroundColor: "#cbd5e1",
              margin: "0 4px",
            }}
          />

          {/* Status Filter */}
          <Box sx={{ flex: "0 0 auto" }}>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "6px",
                color: "text.primary",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: '"AvenirLTStd-Book", "Avenir LT Std", sans-serif',
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Archive className="w-3 h-3 mr-1" />
              Status
            </Typography>
            <Button
              onClick={handleStatusClick}
              endIcon={<KeyboardArrowDown sx={{ fontSize: "16px" }} />}
              sx={{
                color: "#374151",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 12px",
                minWidth: "100px",
                height: "40px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                backdropFilter: "blur(5px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: "#94a3b8",
                },
              }}
            >
              {getFilterDisplayName("status", statusFilter)}
            </Button>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              height: "50px",
              width: "1px",
              backgroundColor: "#cbd5e1",
              margin: "0 4px",
            }}
          />

          {/* Call Type Filter */}
          <Box sx={{ flex: "0 0 auto" }}>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "6px",
                color: "text.primary",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: '"AvenirLTStd-Book", "Avenir LT Std", sans-serif',
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Phone className="w-3 h-3 mr-1" />
              Call Type
            </Typography>
            <Button
              onClick={handleCallTypeClick}
              endIcon={<KeyboardArrowDown sx={{ fontSize: "16px" }} />}
              sx={{
                color: "#374151",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 12px",
                minWidth: "100px",
                height: "40px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                backdropFilter: "blur(5px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: "#94a3b8",
                },
              }}
            >
              {getFilterDisplayName("callType", callTypeFilter)}
            </Button>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              height: "50px",
              width: "1px",
              backgroundColor: "#cbd5e1",
              margin: "0 4px",
            }}
          />

          {/* Direction Filter */}
          <Box sx={{ flex: "0 0 auto" }}>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "6px",
                color: "text.primary",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: '"AvenirLTStd-Book", "Avenir LT Std", sans-serif',
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowUpDown className="w-3 h-3 mr-1" />
              Direction
            </Typography>
            <Button
              onClick={handleDirectionClick}
              endIcon={<KeyboardArrowDown sx={{ fontSize: "16px" }} />}
              sx={{
                color: "#374151",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 12px",
                minWidth: "100px",
                height: "40px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                backdropFilter: "blur(5px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: "#94a3b8",
                },
              }}
            >
              {getFilterDisplayName("direction", directionFilter)}
            </Button>
          </Box>

          {/* Main Divider */}
          <Box
            sx={{
              height: "50px",
              width: "2px",
              backgroundColor: "#94a3b8",
              margin: "0 8px",
              borderRadius: "1px",
            }}
          />

          {/* Action Buttons */}
          <Box sx={{ flex: "0 0 auto", display: "flex", gap: "8px" }}>
            {/* Search Button */}
            <Button
              onClick={onApplyFilters}
              disabled={isLoading}
              startIcon={<Search className="w-4 h-4" />}
              sx={{
                color: "white",
                backgroundColor: "#6366f1",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 16px",
                height: "40px",
                borderRadius: "8px",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                boxShadow: "0 2px 4px rgba(99, 102, 241, 0.2)",
                "&:hover": {
                  backgroundColor: "#5855eb",
                  boxShadow: "0 4px 8px rgba(99, 102, 241, 0.3)",
                },
                "&:disabled": {
                  backgroundColor: "#9ca3af",
                  color: "white",
                },
              }}
            >
              {isLoading ? "..." : "Search"}
            </Button>

            {/* Reset Button */}
            <Button
              onClick={onResetFilters}
              disabled={isLoading}
              startIcon={<RotateCcw className="w-4 h-4" />}
              sx={{
                color: "#64748b !important",
                backgroundColor: "rgba(255, 255, 255, 0.8) !important",
                border: "1px solid #cbd5e1 !important",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 16px",
                height: "40px",
                borderRadius: "8px",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                backdropFilter: "blur(5px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9) !important",
                  borderColor: "#94a3b8 !important",
                },
                "&:disabled": {
                  backgroundColor: "rgba(248, 250, 252, 0.5) !important",
                  color: "#cbd5e1 !important",
                  borderColor: "#e2e8f0 !important",
                },
              }}
            >
              Reset
            </Button>

            {/* Export CSV Button */}
            <Button
              onClick={onExportCsv}
              startIcon={<Download className="w-4 h-4" />}
              sx={{
                color: "white",
                backgroundColor: "#10b981",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 16px",
                height: "40px",
                borderRadius: "8px",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
                "&:hover": {
                  backgroundColor: "#059669",
                  boxShadow: "0 4px 8px rgba(16, 185, 129, 0.3)",
                },
              }}
            >
              CSV ({filteredCount})
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Dropdown Menus */}
      {renderDropdownMenu(
        statusAnchorEl,
        statusOptions,
        statusFilter,
        handleStatusSelect
      )}
      {renderDropdownMenu(
        callTypeAnchorEl,
        callTypeOptions,
        callTypeFilter,
        handleCallTypeSelect
      )}
      {renderDropdownMenu(
        directionAnchorEl,
        directionOptions,
        directionFilter,
        handleDirectionSelect
      )}

      {/* Click outside to close menus */}
      {(statusAnchorEl || callTypeAnchorEl || directionAnchorEl) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={closeAllMenus}
        />
      )}
    </>
  );
}
