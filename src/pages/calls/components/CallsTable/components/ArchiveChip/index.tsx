import { Chip, CircularProgress, Tooltip } from '@mui/material';
import { useArchiveCall } from './hooks';

type ArchiveChipProps = {
  isArchived: boolean;
  callId: string;
};

export function ArchiveChip({ isArchived, callId }: ArchiveChipProps) {
  const [handleArchiveAsync, isLoading] = useArchiveCall();

  const onArchive = () => handleArchiveAsync(callId);

  return (
    <Tooltip title={`Click to ${isArchived ? 'un' : ''}archive`}>
      <Chip
        onClick={onArchive}
        className={isArchived ? 'archived' : 'unarchived'}
        disabled={isLoading}
        label={isLoading ? <CircularProgress size={20} sx={{ mx: 2.4 }} /> : isArchived ? 'archived' : 'Unarchived'}
      />
    </Tooltip>
  );
}
