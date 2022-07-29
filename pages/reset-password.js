import React from 'react';
import { useState,useEffect } from 'react';
import { supabase } from '../utils/db';
const ResetPassword = () => {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
const [hash, setHash] = useState('')
    useEffect(() => {
const ishash = window.location.hash
console.log('is--->?',ishash)


        setHash(window.location.hash);
        console.log('hash----->',hash);
// delete from hash to => #
//         const hash = window.location.hash.substring(1).split('&').map(item => item.split('='))
// console.log(hash[0][1])
// setHash(hash[0][1])





    }, [])


const ResetPassword = async (e) => {

    const query = new URLSearchParams(hash.substring(1));
    console.log('QUERYHASH--------->',query.get('hash'))
    const isRecovery = query.get("type") === "recovery";
    const accessToken = query.get("access_token");
    
    console.log(isRecovery,accessToken)
    




    const { error } = await supabase.auth.api.updateUser(accessToken, {
        password: password,
      });

      if (error)
      {
        console.log(error)
      }
        else
        {
            console.log("password changed")
        }

}



    return (
        <div>
            <h1>Reset Password</h1>

            <input type="password" 
              name="password" 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="your@email.com"
              id="website"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

              <button
              type='submit'
                className="my-3 w-36 text-xs h-8 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700"
                onClick={ResetPassword}
              >
            ResetPassword</button>


                
        </div>
    );
}

export default ResetPassword;
