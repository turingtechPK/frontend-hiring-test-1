import { ThemeOptions } from '@mui/material';

export const theme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46f8',
    },
    secondary: {
      main: '#74ded2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          '&.archived': {
            background: '#edfbfa',
            color: '#5fc3b7',
          },
          '&.unarchived': {
            background: '#eeeeee',
          },
        },
      },
    },
  },
};
