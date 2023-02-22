import Head from 'next/head';
import { useRouter } from 'next/router';

import { NavBar } from './NavBar';
import { ReactNode } from 'react';

import { Session } from '@supabase/auth-helpers-react'


interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
    const router = useRouter();
    const meta = {
      title: 'ChatDiffusion',
      description: 'Edit your images from text.',
    };
  
    return (
      <>
        <Head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="icon" href="/cd-3-logo.svg" />
        </Head>
        <NavBar/>
        <>{children}</>
      </>
    );
  }
  