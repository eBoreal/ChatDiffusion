import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js';

export async function fetchGetJSON(url: string) {
    try {
      const data = await fetch(url).then((res) => res.json())
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      throw err
    }
  }
  
export async function fetchPostJSON(url: string, data?: {}) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    })
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw err
  }
}

export async function addCredits({
  amount,
  userId
}: {
  amount: number,
  userId: string
}) {
  try {
    if (!userId) throw new Error('No user')

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
        "api/create-stripe-checkout", 
        { 
          amount,
          userId 
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

export async function getCredits ({
  supabase,
  userId
}: {
  supabase: any,
  userId: string
}) {
  try {
      if (!userId) throw new Error('No user');

      let { data, error, status } = await supabase
              .from('profiles')
              .select(`available_credits`)
              .eq('id', userId)
              .single()

      if (error && status !== 406) {
          throw error
      }
      
      if (data && data.available_credits) {
          return data.available_credits
      }

      return 0
  } catch (error) {
      // alert('Error loading user data!')
      console.log(error)
      return 0
  }
}