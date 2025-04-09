import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Typography,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface CallStatusFilterProps {
  statusFilter: string;
  onFilterChange: (event: SelectChangeEvent<string>) => void;
}

export const CallStatusFilter: React.FC<CallStatusFilterProps> = ({
  statusFilter,
  onFilterChange,
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="subtitle1" sx={{ fontSize: 15 }}>
        Filter By:
      </Typography>

      <FormControl variant="outlined" sx={{ minWidth: 100 }}>
        <Select
          value={statusFilter}
          onChange={onFilterChange}
          displayEmpty
          IconComponent={ArrowDropDownIcon}
          sx={{
            color: "#4F46F8",
            fontWeight: 500,
            borderRadius: "4px",
            minWidth: 120,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-icon": {
              color: "#4F46F8",
            },
            "&:hover": {
              backgroundColor: "#f0efff",
            },
          }}
        >
          {["all", "archived", "unarchived"].map((status) => (
            <MenuItem
              key={status}
              value={status}
              sx={{
                color: "black",
                fontWeight: 500,
                fontSize: 14,
                "&:hover": {
                  color: "#4F46F8",
                },
                "&.Mui-selected": {
                  color: "#4F46F8",
                },
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
