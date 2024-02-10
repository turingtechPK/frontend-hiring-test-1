import { TableCell, TableHead, TableRow } from '@mui/material';

export function TableHeader() {
  return (
    <TableHead>
      <TableRow
        sx={{
          background: '#f4f4f9',
          '& > .MuiTableCell-root': {
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          },
        }}
      >
        <TableCell>Call Type</TableCell>
        <TableCell>Direction</TableCell>
        <TableCell>Duration</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Via</TableCell>
        <TableCell>Created at</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
