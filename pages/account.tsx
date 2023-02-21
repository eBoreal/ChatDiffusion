import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react'

import Account from '../components/Account'
import { redirectToLogin } from '../utils/protectRoutes'

// if not logged in redirect to /user for user to log in
export const getServerSideProps = redirectToLogin

export default function AccountPage() { 
  const router = useRouter()
  const session = useSession()

  if (!session) {
    router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
  }

  return (
      <div className="bg-background">
        <div className="w-1/3 mx-auto">
          <Account session={session}/>
        </div>
      </div>

    );
};