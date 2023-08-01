import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

const Dropdown = ({ setStatus2 }) => {
  const [selectedOption, setSelectedOption] = useState("Status");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setStatus2(event.target.value);
  };

  return (
    <Box display="flex" alignItems="center">
      <InputLabel sx={{ marginRight: "15px", marginTop: "15px" }}>
        Filter by:
      </InputLabel>
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          label="Filter by:"
          sx={{ color: "blue" }}
        >
          <MenuItem value="Status">Status</MenuItem>
          <MenuItem value="Archived">Archived</MenuItem>
          <MenuItem value="Unarchive">Unarchive</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
