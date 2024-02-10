import React from 'react';
import { CALL_STATUS_FILTERS } from '@/constants';
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

type FilterDropdownProps = {
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
};

export function FilterDropdown({ statusFilter, setStatusFilter }: FilterDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setFilter = (filter: string) => {
    setStatusFilter(filter);
    handleClose();
  };

  return (
    <Stack direction="row" alignItems="baseline" gap={1}>
      <Typography>Filter by:</Typography>
      <Button
        id="filter-button"
        aria-controls={open ? 'filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          textTransform: 'capitalize',
        }}
        endIcon={<KeyboardArrowDown sx={{ color: 'grey' }} />}
      >
        {statusFilter === 'all' ? 'Status' : statusFilter}
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
      >
        {CALL_STATUS_FILTERS.map((filter) => (
          <MenuItem
            onClick={() => setFilter(filter)}
            key={filter}
            sx={(theme) => ({
              textTransform: 'capitalize',
              ...(statusFilter === filter && {
                background: '#d8d6fd',
                color: theme.palette.primary.main,
              }),
            })}
          >
            {filter}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
