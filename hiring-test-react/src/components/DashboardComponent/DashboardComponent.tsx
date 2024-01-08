import { useState } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import DataTable from "../DataTable";

import { stylesMui } from "./styles";

const DashboardComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState("");

  // @ts-expect-error no need for type here
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value as string);
  };

  return (
    <div id="loggedin" className="p-10">
      <Typography sx={stylesMui.pageHeading}>
        Turing technologies frontend test
      </Typography>
      <Box>
        <div className="flex py-8 gap-2">
          <Typography sx={stylesMui.pageBody}>Filter by:</Typography>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select
              placeholder="Status"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Archived">Archived</MenuItem>
              <MenuItem value="Unarchived">Unarchived</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      <DataTable selectedFilter={selectedFilter} />
    </div>
  );
};

export default DashboardComponent;
