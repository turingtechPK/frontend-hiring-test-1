import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { Box, TableCell, TableRow } from '@mui/material';

const headCells = [
    {
      id: 'call_type',
      numeric: false,
      disablePadding: true,
      label: 'Call Type',
    },
    {
      id: 'direction',
      numeric: false,
      disablePadding: false,
      label: 'Direction',
    },
    {
      id: 'duration',
      numeric: false,
      disablePadding: false,
      label: 'Duration',
    },
    {
      id: 'from',
      numeric: false,
      disablePadding: false,
      label: 'From',
    },
    {
      id: 'to',
      numeric: false,
      disablePadding: false,
      label: 'To',
    },
    {
      id: 'via',
      numeric: false,
      disablePadding: false,
      label: 'Via',
    },
    {
      id: 'created_at',
      numeric: false,
      disablePadding: false,
      label: 'Created At',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false,
      label: 'Action',
    },
  ];
  
export default function CallsTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              
                {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  CallsTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };