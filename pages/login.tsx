import { useRouter } from 'next/router';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Login() {
  const router = useRouter();
 
  const session = useSession()
  const supabase = useSupabaseClient()


  if (session) {
    router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/account`)
  }

  return (
      <div className="bg-background">
        <div className="w-1/3 mx-auto">
          <Auth 
            providers={['google']}
            supabaseClient={supabase} 
            appearance={{ theme: ThemeSupa }} 
            theme="dark" />
          </div>
      </div>

    );
};