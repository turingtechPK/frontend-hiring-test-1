import Head from 'next/head'
import { Inter } from '@next/font/google'
import Login from '../components/login'
import TopBanner from '../components/top-banner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Turing Front End Challenge Next App</title>
        <meta name="description" content="Calls Data App Created in NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBanner is_landing={true}/>
      <Login />
    </>
  )
}
