import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'

import Stripe from 'stripe'

import { getServiceSupabase } from '../../utils/supabase'

export const config = { api: {
    bodyParser: false
}};


export default async function (
    req: any, 
    res: any
)   {
    console.log("Webhook reached")


    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        // https://github.com/stripe/stripe-node#configuration
        apiVersion: '2022-11-15',
      })
    const signature = req.headers['stripe-signature']
    const signingSecret = process.env.STRIPE_SIGNING_SECRET
    const reqBuffer = await buffer(req)

    if (!signingSecret) {
        console.log("No signing key")
        return res.status(500).send(`Stripe signing secret key missing`)
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
    } catch (error: any) {
        console.log(error)
        return res.status(400).send(`Webhook error: ${error.message}`)
    }

    let userId;
    let amount;
    try {
        const supabase = getServiceSupabase()

        if (!supabase) throw new Error('No supabase service')

        switch (event.type) {
            case 'checkout.session.completed':
                const charge = event.data.object as Stripe.Charge;
                userId = charge.metadata.userId
                amount = charge.metadata.amount

                if (!userId) throw new Error('No user')
                
                
                let { error } = await supabase
                    .rpc('increment_credits', {
                        userid: userId, 
                        amount
                    })
                
                if (error) throw error

                console.log("Success adding credits")
        }
    } catch (error) {
        alert(`Error in stripe-hook: ${error}`)
        console.log(error)
    }

    res.send({ received: true });
};
