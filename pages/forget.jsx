import React from 'react';
import { useState } from 'react'
import { supabase } from '../utils/db'
const Forgetpass = () => {
const [email, setEmail] = useState('gomemahero@gmail.com')

    const handleForgottenPassword = async () => {
      try{

      
        await supabase.auth.api.resetPasswordForEmail(email, {
          redirectTo:'http://localhost:3000/reset-password'
        });
        alert('Password reset link has been sent to your email')
      } catch(err){
        alert(err.message)
      }
      };

    return (
       <div>

<div>
    <h1>Forget Password</h1>

    <button
    onClick={handleForgottenPassword}
    className="my-3 w-36 text-xs h-8 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700" >
               Send magic link
              </button>


</div>


       </div>
    );
}

export default Forgetpass;
