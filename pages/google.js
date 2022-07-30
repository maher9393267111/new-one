import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {supabase} from '../utils/db'
const GoogleLogin = () => {


const log = async() => {
    const { user, session, error } = await supabase.auth.signIn({
        provider: 'google',
      })
      
      console.log("user", user);

        const { user:userdata , error:usererror} = await supabase.from('users').insert({
            username: 'makeerrr',
            last_name: 'makeerrr',
            first_name: 'makeerrr',
            email: 'EMAIL'
          }).eq('id', user?.id)



 
     
    }


    return (
        <div>
            
<button onClick={log}>Login with Google</button>


        </div>
    );
}

export default GoogleLogin;
