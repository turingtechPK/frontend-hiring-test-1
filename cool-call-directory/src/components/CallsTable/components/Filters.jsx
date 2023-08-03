import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Checkbox } from '@mui/material';

const options = [
 {value: 'missed', label:'Missed'},
 {value: 'answered', label: 'Answered'},
 {value: 'voicemail', label: 'Voice Mail'}
];

const ITEM_HEIGHT = 48;

export default function Filters({selected, setSelected}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event,value) => {
    if (event.target.checked){
        setSelected((prevSelected) => [...prevSelected,value])
    } else {
        setSelected(selected.filter((selectedvalue) => selectedvalue !== value))
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterListIcon/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value}>
            <Checkbox
                onChange={(e) => handleCheckboxChange(e, option.value)}
                checked={selected.includes(option.value)}
            /> {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
