import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./FilterControls.module.scss";

interface FilterControlsProps {
  statusFilter: string;
  groupBy: string;
  onStatusChange: (event: SelectChangeEvent<string>) => void;
  onGroupByChange: (event: SelectChangeEvent<string>) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  statusFilter,
  groupBy,
  onStatusChange,
  onGroupByChange,
}) => {
  return (
    <div className={styles.filtersContainer}>
      <FormControl variant="outlined" className={styles.filterSelect}>
        <InputLabel>Status</InputLabel>
        <Select value={statusFilter} onChange={onStatusChange} label="Status">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Archive">Archived</MenuItem>
          <MenuItem value="unarchive">Unarchived</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={styles.filterSelect}>
        <InputLabel>Group By</InputLabel>
        <Select value={groupBy} onChange={onGroupByChange} label="Group By">
          <MenuItem value="">None</MenuItem>
          <MenuItem value="call_type">Call Type</MenuItem>
          <MenuItem value="from">From</MenuItem>
          <MenuItem value="date">Date</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterControls;
