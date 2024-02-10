import { useNavigate } from 'react-router-dom';
import TTLogo from '@/assets/TT Logo.png';
import { isAuthenticated } from '@/lib/utils';
import { LS_KEYS } from '@/constants';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(LS_KEYS.accessToken);
    localStorage.removeItem(LS_KEYS.refreshToken);
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: '#fff',
          boxShadow: 'none',
          borderBottom: '2px solid #e4e4e4',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Box
            component="img"
            src={TTLogo}
            sx={{
              height: '30px',
            }}
            alt="Turing Technologies Logo"
          />
          {isAuthenticated() ? (
            <Button variant="contained" onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
