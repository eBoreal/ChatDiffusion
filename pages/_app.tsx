import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'

import '../styles/globals.css'
import Layout from '../components/Layout'


function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  
  const [supabase] = useState(() => createBrowserSupabaseClient())


  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
export default App