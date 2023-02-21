import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { useUser, useSupabaseClient, Session, useSession} from '@supabase/auth-helpers-react'
import { Database } from '../types/supabase'
type Profiles = Database['public']['Tables']['profiles']['Row']

import {Logo} from './Logo';
import s from '../styles/navbar.module.css';
import { MessageList } from "./MessageList";


export function NavBar() {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const session = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState<Profiles['available_credits']>(0)

  const messages = MessageList.use.getState().messages


  useEffect(() => {
    getCredits()
  }, [session])

  useEffect(() => {
    const unsub = MessageList.use.subscribe(()=>{
      getCredits()
    })
    
    return () => unsub();
  }, [])

  async function getCredits() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`available_credits`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setCredits(data.available_credits)
      }
    } catch (error) {
      // alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1  items-center">
            <Link href="/" className='flex flex-row' aria-label="Logo">
                <Logo />
                <p className="font-extrabold text-white ml-2 text-xl">
                  ChatDiffusion
                </p>
            </Link>
          </div>
          

          <div className="flex flex-1 justify-end space-x-8">
            {!(router.pathname === '/chat') ? (
              <Link href="/chat" className="link dropCardText">
                Launch Chat
              </Link>
            ) : (
              <Link href="/account" className="link dropCardText">
                Credits: {credits}
              </Link>
            )}

            {session ? (
              <Link href="/account" className="link dropCard">
                My Account
              </Link>
            ) : (
              <Link href="/login" className="link dropCard">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

