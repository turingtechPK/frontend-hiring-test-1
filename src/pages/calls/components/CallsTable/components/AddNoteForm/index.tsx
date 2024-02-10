import { FormEvent, useState } from 'react';
import { useTheme } from '@/lib/hooks';
import { getFormattedTime } from '@/lib/utils';
import { useCallsContext } from '@/pages/calls/hooks';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@/components';
import { ModalContainer } from '@/components/ModalContainer';
import { useAddNote } from './hooks';

type AddNoteFormProps = {
  modalDetails: ModalDetails;
};

export function AddNoteForm({ modalDetails }: AddNoteFormProps) {
  const { selectedCall: call, setSelectedCall } = useCallsContext();

  const [note, setNote] = useState('');

  const handleClose = () => {
    modalDetails.closeModal();
    setSelectedCall(null);
    setNote('');
  };

  const [handleAddNoteAsync, isLoading] = useAddNote();

  const theme = useTheme();

  if (!call) return <></>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (note.trim().length > 0) {
      await handleAddNoteAsync(call.id, note);
    }

    handleClose();
  };

  return (
    <ModalContainer modalDetails={modalDetails}>
      <Card
        raised
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          title={
            <Stack p={1} direction="row" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap">
              <Stack>
                <Typography
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 500,
                  }}
                >
                  Add Notes
                </Typography>
                <Typography variant="body2" sx={(theme) => ({ mt: 1, color: theme.palette.primary.main })}>
                  Call ID: {call.id}
                </Typography>
              </Stack>
              <Tooltip title="Close Modal">
                <IconButton onClick={modalDetails.closeModal} sx={(theme) => ({ color: theme.palette.primary.main })}>
                  <Close />
                </IconButton>
              </Tooltip>
            </Stack>
          }
        />

        <CardContent
          sx={{
            borderBlock: '1px solid grey',
            p: 3,
          }}
          component={Stack}
          gap={1}
        >
          <CallDescriptionItem
            label="Call Type"
            value={call.call_type}
            color={
              call.call_type === 'missed'
                ? theme.palette.error.main
                : call.call_type === 'answered'
                  ? theme.palette.secondary.main
                  : 'blue'
            }
          />
          <CallDescriptionItem label="Duration" value={getFormattedTime(call.duration)} />
          <CallDescriptionItem label="From" value={call.from} />
          <CallDescriptionItem label="To" value={call.to} />
          <CallDescriptionItem label="Via" value={call.via} />

          <FormControl>
            <Typography>Notes</Typography>

            <TextField
              value={note}
              onChange={(e) => setNote(e.target.value)}
              multiline
              rows={4}
              placeholder="Add Notes"
            />
          </FormControl>
        </CardContent>

        <CardActions
          sx={{
            p: 2,
          }}
        >
          <LoadingButton
            isLoading={isLoading}
            disabled={isLoading}
            variant="contained"
            type="submit"
            fullWidth
            sx={{ py: 1 }}
          >
            Save
          </LoadingButton>
        </CardActions>
      </Card>
    </ModalContainer>
  );
}

type CallDescriptionItemProps = {
  label: string;
  value: string;
  color?: string;
};

function CallDescriptionItem({ label, value, color }: CallDescriptionItemProps) {
  return (
    <Stack
      gap={1}
      direction="row"
      sx={{
        '& .MuiTypography-root': {
          fontSize: '0.9rem',
        },
      }}
    >
      <Typography sx={{ fontWeight: 'bold', minWidth: '65px' }}>{label}</Typography>
      <Typography sx={{ textTransform: 'capitalize', color }}>{value}</Typography>
    </Stack>
  );
}
