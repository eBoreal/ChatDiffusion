import { useRouter } from 'next/router';
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { Database } from '../types/supabase'
type Profiles = Database['public']['Tables']['profiles']['Row']

import { Credits } from '../components/Credits'
import Account from '../components/Account'
import { redirectToLogin } from '../utils/protectRoutes'

// if not logged in redirect to /user for user to log in
export const getServerSideProps = redirectToLogin

export default function AccountPage() { 
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient<Database>()
  const user = useUser()


  if (!session) {
    router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
  }

  return (
      <div className="bg-background mx-auto max-w-[50rem]">
          <Credits supabase={supabase} user={user}/>
          <Account session={session} supabase={supabase} user={user}/>
      </div>

    );
};