import { Stack, Typography } from '@mui/material';
import { CallsTable } from './components';
import { CallsContextProvider } from './providers';

export function CallsPage() {
  return (
    <CallsContextProvider>
      <Stack
        sx={{
          p: 6,
        }}
        gap={3}
      >
        <Typography variant="h4" component="h1">
          Turing Technologies Frontend Test
        </Typography>

        <CallsTable />
      </Stack>
    </CallsContextProvider>
  );
}
