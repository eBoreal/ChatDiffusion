import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../types/supabase'
type Profiles = Database['public']['Tables']['profiles']['Row']

import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js';

import { fetchPostJSON } from '../utils/api-helpers'



export default function Account({ session }: { session: Session | null }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [credits, setCredits] = useState<Profiles['available_credits']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url, available_credits`)
        .eq('id', user.id)
        .single()


      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setCredits(data.available_credits)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      // alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function addCredits({
    credits_increment
  }: {
    credits_increment: number
  }) {
    try {
      setLoading(true)
      if (!user || !user.id ) throw new Error('No user')

      const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
          "api/create-stripe-checkout", 
          { 
            amount: credits_increment,
            userId: user.id 
          }
      );

      if ((checkoutSession as any).statusCode === 500) {
        console.error((checkoutSession as any).message);
        return;
      }

        // Redirect to Checkout.
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: checkoutSession.id,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message);

    } catch (error) {
      console.log(error)
    }
  }

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: Profiles['username']
    avatar_url: Profiles['avatar_url']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="relative w-full mx-auto max-w-[60.75rem] sm:flex sm:flex-col sm:align-centersm:align-center">
      <div className='bg-popupBar rounded-lg w-full sm:flex sm:flex-col sm:align-centersm:align-center mt-8 p-4'>
          <p className="text-2xl font-extrabold text-zinc-200">
              Available credits: {credits}
          </p>
          <p className="text-2xl font-extrabold text-zinc-200 mt-10">
              Add credits:
          </p>
          <div className='flex'>
            <button 
            className="btn dropCard font-bold text-xl h-12 w-48 mt-8 rounded-2xl mx-auto"
            type="button"
            onClick={() => addCredits({credits_increment: 10})}
            >
                10 credits
            </button>
            <button 
            className="btn dropCardText font-bold text-xl h-12 w-48 mt-8 rounded-2xl mx-2"
            type="button"
            onClick={() => addCredits({credits_increment: 20})}
            >
                20 credits
            </button>
            <button 
            className="btn bg-indigo-900 font-bold text-xl h-12 w-48 mt-8 rounded-2xl mx-auto"
            type="button"
            onClick={() => addCredits({credits_increment: 100})}
            >
                100 credits
            </button>
          </div>
          <p className="font-extrabold text-zinc-200 mt-10">
              * 1 credit = 9 cents
          </p>


      </div>

      <div className='bg-popupBar rounded-lg w-full sm:flex sm:flex-col sm:align-centersm:align-center mt-8 p-2'>
          <p className="text-2xl font-extrabold text-zinc-200 mb-2">
              Update your profile info here
          </p>
          <div className='w-full pb-5 px-4 pt-1.5 text-white/75 text-sm m-2'>
              <label htmlFor="email">Email</label>
              <input className="w-full text-lg text-white/75 placeholder:text-white/30 outline-none focus:border-none bg-transparent"
              id="email" type="text" value={session?.user.email} disabled />
          </div>
          <div className='w-full pb-5 px-4 pt-1.5 text-white/75 text-sm m-2'>
              <label htmlFor="username">Username</label>
              <input
              className='w-full text-lg text-white/75 placeholder:text-white/30 outline-none focus:border-none bg-transparent'
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>

          <button
              className="btn dropCard font-bold text-xl h-12 w-48 m-2 rounded-2xl mx-auto"
              type="button"
              onClick={() => updateProfile({ username, avatar_url })}
              disabled={loading}
          >
              {loading ? 'Loading ...' : 'Update'}
          </button>
      </div>


      <div className='bg-popupBar rounded-lg w-full sm:flex sm:flex-col sm:align-centersm:align-center mt-8 p-4'>
          <p className="text-2xl font-extrabold text-zinc-200">
              Want to leave ? 
          </p>
          <button 
          className="btn dropCardText font-bold text-xl h-12 w-48 mt-8 rounded-2xl mx-auto"
          type="button"
          onClick={() => supabase.auth.signOut()}>
              Sign Out
          </button>
      </div>
    </div>
  )
}