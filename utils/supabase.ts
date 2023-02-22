import { createClient } from "@supabase/supabase-js"

// export const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )

export const getServiceSupabase = () => {
    const public_url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const secret_key = process.env.SECRET_SUPABASE_SERVICE_ROLE
    
    if (!public_url || !secret_key) return console.log("Supabase keys are not set");
    
    return createClient(
        public_url, 
        secret_key
    )
    
}