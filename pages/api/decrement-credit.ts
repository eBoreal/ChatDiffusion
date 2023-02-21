import { NextApiRequest, NextApiResponse } from 'next'

import { getServiceSupabase } from '../../utils/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    
    const supabase = getServiceSupabase()
    const userId = req.body.userId
    
    if (!req.body.userId || !supabase) return res.status(500).end();

    try {
      // read current avaible first
      let { data } = await supabase
        .from('profiles')
        .select(`available_credits`)
        .eq('id', userId)
        .single()

      if (!data) throw new Error('Did not find user credits');
      
      const current_credits = data.available_credits

      if (!current_credits || current_credits <= 0) throw new Error('Not enough credits');
      
      let { error } = await supabase
        .rpc('decrement_credits', {
          userid: userId, 
      });
      
      if (error) throw error;
      
      return res.status(200).end()
  
    } catch (error) {
      console.log(error)
      return res.status(500).end()
    }
};

export const config = {
    runtime: 'nodejs',
};