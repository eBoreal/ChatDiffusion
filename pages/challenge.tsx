import { useState, useEffect } from 'react'

import { useRouter } from 'next/router';
import { User } from '../components/User'
import { FootBar } from '../components/FootBar'

export default function Challenge() {
    const router = useRouter();
    let [user, setUser] = useState({
        id: "11111",
        name: "John Doe"
    })
    
    useEffect(() => {
        const retrieved = JSON.parse(
            window.localStorage.getItem("UnrealUser") || "John Doe"
            )
        setUser(retrieved)
      }, [])
    
    

    return (
    <div className="max-w-6xl mx-auto m-5 space-y-40 py-8 sm:flex sm:flex-col sm:py-24 px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col align-center mx-auto">
            <h1 className="text-2xl font-extrabold text-white text-center ">
                Welcome {user.name}
            </h1>
            <h1 className="text-2xl m-5 text-white text-center ">
                the challenge of the day is ... 
            </h1>
            <FootBar/>
        </div>
    </div>


    )
}