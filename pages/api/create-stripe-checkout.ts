import { NextApiRequest, NextApiResponse } from 'next'

// import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config'
// import { formatAmountForStripe } from '../../../utils/stripe-helpers'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    const amount: number = req.body.amount
    const userId: string = req.body.userId

    try {
  
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price: 'price_1MZxREFqaF70F2519MCiwLOK',
            quantity: amount,
          },
        ],
        metadata: { userId, amount },
        success_url: `${req.headers.origin}/chat`,
        cancel_url: `${req.headers.origin}/account`,
      }
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export const config = {
  runtime: 'nodejs',
}