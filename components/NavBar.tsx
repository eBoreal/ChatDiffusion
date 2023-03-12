import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import create from "zustand";

import { useUser, useSupabaseClient, useSession} from '@supabase/auth-helpers-react'
import { Database } from '../types/supabase'

import {Logo} from './Logo';
import s from '../styles/navbar.module.css';
import { MessageList } from "./MessageList";
import { User } from "./User";

import { getCredits } from "../utils/api-helpers"

export function NavBar() {
  // const supabase = useSupabaseClient<Database>()
  // const user = useUser()
  // const session = useSession()
  const user = User.use.getState()
  const router = useRouter()

  const [credits, setCredits] = NavBar.use((state) => [
    state.credits,
    state.setCredits,
  ])

  // useEffect(() => {
  //   if (!supabase || !user || !user.id) return;

  //   // getCredits({supabase, userId: user.id}).then(setCredits)
  // }, [session])

  // useEffect(() => {
  //   const unsub = MessageList.use.subscribe(()=>{
  //     if (!supabase || !user || !user.id) return;

  //     // getCredits({supabase, userId: user.id}).then(setCredits)
  //   })
    
  //   return () => unsub();
  // }, [])

  
  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-2 relative">
          <div className="flex flex-1  items-center">
            <Link href="/" className='flex flex-row' aria-label="Logo">
                {/* <Logo /> */}
                <p className="font-extrabold text-white ml-2 text-xl">
                  BeUnreal
                </p>
            </Link>
          </div>
          

          <div className="flex flex-1 justify-end space-x-8">
            {/* {!(router.pathname === '/chat') ? (
              <Link href="/chat" className="link dropCardText">
                Launch Chat
              </Link>
            ) : (
              <></>
              <Link href="/account" className="link dropCardText">
                {`Credits: ${credits}`}
              </Link>
            )} */}

            {(router.pathname === '/chat') ? (
              <Link  href="/challenge" className="link dropCardText" onClick={
                ()=> MessageList.use.getState().deleteMessage()
              }>
                Restart
              </Link>
            ) : (
              <></>
            )}

            {/* {session ? (
              <Link href="/account" className="link dropCard">
                My Account
              </Link>
            ) : (
              <Link href="/login" className="link dropCard">
                Sign in
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};


export type NavBar = {
  credits: number;
  setCredits: (credits: number) => void; 
};

export namespace NavBar {
  export const use = create<NavBar>()((set) => ({
    credits: 0,
    setCredits: (credits: number) => set((state: NavBar)=> ({ credits }))
  }));
}