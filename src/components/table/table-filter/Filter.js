import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const Filter = ({ options, value, onChange }) => {
  return (
      <Select value={value} onChange={onChange}>
        <MenuItem value={value}>All</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
       
      </Select>
  );
};

export default Filter;
