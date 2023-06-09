import Header from '@/components/Header'
import { IMockData, MockDataProvider } from '@/contexts/MockDataContext'
import IChallenge from '@/interfaces/IChallenge'
import ISport from '@/interfaces/ISport'
import { mockChallenges } from '@/mockdata/mockChallenges'
import { mockSports } from '@/mockdata/mockSports'
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Maclo-upside</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <MockDataProvider>
        <Component {...pageProps} />
      </MockDataProvider>
    </>
  )
}

