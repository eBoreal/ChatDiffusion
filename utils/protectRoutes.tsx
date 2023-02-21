import {
    createServerSupabaseClient,
    User
  } from '@supabase/auth-helpers-nextjs';
  
import { GetServerSidePropsContext } from 'next';

// points to https://chat-diffusion-beta.vercel.app/ in prod
const base_url = process.env.NEXT_PUBLIC_BASE_URL
  
export const redirectToLogin = async (
    ctx: GetServerSidePropsContext,
    dest: string) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx);
    // Check if we have a session
    const {
      data: { session }
    } = await supabase.auth.getSession();
  
    if (!session)
      return {
        redirect: {
          destination: `${base_url}/login`,
          permanent: false
        }
      };
  
    return {
      props: {
        initialSession: session,
        user: session.user
      }
    };
  };