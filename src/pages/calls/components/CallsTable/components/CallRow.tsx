import { getFormattedTime } from '@/lib/utils';
import { Call } from '@/models';
import { Button, TableCell, TableRow } from '@mui/material';
import { ArchiveChip } from '.';

type CallRowProps = {
  call: Call;
  handleAddNoteClick: () => void;
};

export function CallRow({ call, handleAddNoteClick }: CallRowProps) {
  return (
    <TableRow
      sx={{
        '& > .MuiTableCell-root': {
          textTransform: 'capitalize',
        },
      }}
    >
      <TableCell
        sx={(theme) => ({
          color:
            call.call_type === 'missed'
              ? theme.palette.error.main
              : call.call_type === 'answered'
                ? theme.palette.secondary.main
                : 'blue',
        })}
        scope="row"
      >
        {call.call_type}
      </TableCell>
      <TableCell sx={{ color: 'blue' }}>{call.direction}</TableCell>
      <TableCell
        sx={{
          fontSize: '0.8rem',
          '& > p': {
            m: 0,
            color: 'blue',
          },
        }}
      >
        {getFormattedTime(call.duration)}
        <p>({call.duration}) seconds</p>
      </TableCell>
      <TableCell>{call.from}</TableCell>
      <TableCell>{call.to}</TableCell>
      <TableCell>{call.via}</TableCell>
      <TableCell>{new Date(call.created_at).toLocaleDateString('en-GB').replace(/\//g, '-')}</TableCell>
      <TableCell>
        <ArchiveChip isArchived={call.is_archived} callId={call.id} />
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={handleAddNoteClick}>
          Add Note
        </Button>
      </TableCell>
    </TableRow>
  );
}
