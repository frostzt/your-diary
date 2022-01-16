import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/index.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <Head>
        <title>Just Your Diary!</title>
        <meta name="description" content="Just your Diary!" />
      </Head>
      <main className="h-full w-full">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default App;
