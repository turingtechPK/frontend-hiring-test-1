import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import React from "react";

//Filter Layout
const TableFilter = ({ filter, setFilter, setFilterData }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel variant="standard" htmlFor="filter">
          Filter by:{" "}
        </InputLabel>
        <NativeSelect
          defaultValue={"All"}
          id="filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setFilterData(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="archived">Archived</option>
          <option value="unarchived">Unarchived</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default TableFilter;
