import React from "react";
import { useState } from 'react'
import create from "zustand";

import { getCredits, addCredits } from '../utils/api-helpers'


export function Credits( {
  supabase,
  user,
}: { 
  supabase: any,
  user: any
}) {
    const [credits, setCredits] = Credits.use((state) => [
        state.credits,
        state.setCredits,
      ]);



    // TODO: get these from stripe
    const creditsPlans = [
        {
            amount: 10,
            price: 0.9
        },
        {
            amount: 100,
            price: 9 //4.99
        },
        {
            amount: 500,
            price: 45//10
        },
    ]


    React.useEffect( () => {
      if (!supabase || !user) return;

      handleGetCredits()
    }, [supabase, user])

    function handleAddCredits(amount: number) {
      if (user.id) return addCredits({amount, userId: user.id}).then(handleGetCredits);

      console.log("No user to add credits to")
    }

    function handleGetCredits() {
      if (supabase && user.id) return getCredits({supabase, userId: user.id}
        ).then(setCredits)

      console.log("No user to get credits from")
    }
      
    function CreditsButton({
        amount,
        price
    }: {
        amount: number,
        price: number,
    }) {

        return (
            <button 
                className="btn dropCard font-bold text-xl h-12 w-44 mt-8 rounded-2xl mx-auto"
                type="button"
                onClick={() => handleAddCredits(amount)}
                >
                    {`${amount} credits/ ${price} $`}
            </button>

        )
    }

    return (
      <div className="mx-auto my-[1rem] p-[1rem] text-center rounded-2xl bg-popupBar opacity-90">
          <h1 className={'text-xl font-bold'}>
              Add Credits
          </h1>
          <p className={'m-1'}>
              {`You currently have ${credits ?? 0} credits. Add some to keep chatting`}
          </p>
          <div className="flex flex-row ">
              {Object.values(creditsPlans).map((plan, i) => (
                  <CreditsButton key={i} amount={plan.amount} price={plan.price}/>
              ))}
              <button 
              className="btn font-bold text-xl h-12 mt-8 w-44 rounded-2xl mx-auto border-dashed border-2 border-slate-300"
              type="button"
              onClick={() => handleGetCredits()}
              >
                  Refresh
              </button>
          </div>
      </div>
    )
    

}

export type Credits = {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
  credits: number;
  setCredits: (credits: number) => void;
};

export namespace Credits {
  export const use = create<Credits>()((set) => ({
    hidden: true,
    setHidden: (hidden: boolean) => set((state: Credits)=> ({ hidden })),
    credits: 0,
    setCredits: (credits: number) => set((state: Credits)=> ({ credits })),
  }));
}