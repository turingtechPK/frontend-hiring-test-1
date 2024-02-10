import { useTheme } from '@/lib/hooks';
import { AppRoutes } from '@/pages/AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export default function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}
