import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '../components/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Loader from '../components/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import router from 'next/router';

const theme = createTheme();

export default function CallsPage() {
    const [accessToken, setAccessToken] = React.useState('');
    const [calls, setCalls] = React.useState([]);
    const [pageCount, setpageCount] = React.useState(0);
    const [offset, setOffset] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const limit: number = 9;

    React.useEffect(()=>{
      setIsLoading(true);
      const access_token = JSON.parse(localStorage.getItem('access_token'));
      if(!access_token){
        router.replace('/login');
      }
      else{
        setAccessToken(access_token);
        fetch(
          `https://frontend-test-api.aircall.io/calls?offset=0&limit=${limit}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data.nodes);
            setpageCount(Math.ceil(data.totalCount / limit));
            setCalls(data.nodes);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
            sessionStorage.removeItem("access_token");
            router.replace('/login');
          });
      }
      const interval = setInterval(() => {
        fetch("https://frontend-test-api.aircall.io/auth/refresh-token", {
          method: "POST",
          headers: { Authorization: `Bearer ${access_token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            sessionStorage.setItem(
              "access_token",
              JSON.stringify(data.access_token)
            );
            setAccessToken(data.access_token);
          })
          .catch((error) => {
            console.log(error);
            alert("Looks like you aren't connected to the internet!");
          });
        return () => clearInterval(interval);
      }, 59900);
    },[]);

    const handlePageChange = () => {
      setIsLoading(true);
      setOffset(offset+limit);
      fetch(
        `https://frontend-test-api.aircall.io/calls?offset=${offset+limit}&limit=${limit}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setCalls(data.nodes);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          alert(error);
        });
    };

    const handleLogout = () => {
      setIsLoading(true);
      localStorage.removeItem('access_token');
      router.replace('/login');
    }

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Calls Record
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {!isLoading ? (
            <Grid container spacing={12}>
             {calls.map((call: any) => (
               <Grid item key={call.id} xs={12} sm={6} md={4}>
                 <Card item={call}/>
               </Grid>
             ))}
            </Grid>
          ) : <Loader/>}
          <Grid container marginTop="50px" alignItems="center" justifyContent="center">
            <Pagination color="primary" count={pageCount} siblingCount={0} boundaryCount={2} onChange={handlePageChange} />
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}