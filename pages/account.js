import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../utils/db'
const Accunt = () => {

const [username, setUsername] = useState('')
const [website, setWebsite] = useState('')
const[avatar_url, setAvatarUrl] = useState('')
const [loading, setLoading] = useState(false)
useEffect(() => {

    getProfile()
}, [])


    const getProfile = async () => {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.id)
            .single()
            console.log('data--->', data,status,error)

            if(data){

                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }

        } catch (error) {
            alert(error.message)
        }finally{
            setLoading(false)
        }
    }


    return (
        <div>

            {username}
            
        </div>
    );
}

export default Accunt;
