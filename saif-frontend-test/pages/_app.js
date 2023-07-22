import { Box } from '@mui/material'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Box><Header /><Component {...pageProps} /></Box>
}

export default MyApp
