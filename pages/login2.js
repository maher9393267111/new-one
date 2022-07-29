

import React from 'react';
import { supabase } from '../utils/db'
import { useState, useEffect } from 'react';
const Login2 = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const login = async (e) => {
      e.preventDefault();
  
      console.log("email", email, "password", password);
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
  
      if (error) {
        console.log(error);

     }
     if (user) {
      console.log(user);
     }
    };
   


    return (
      <div>
        <h1>Login</h1>


<div>

<input type="email" 
              name="email" 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="Email"
              id="website"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />



<input type="password" 
              name="password" 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />



<button 
type='submit'
onClick={login}
>Login</button>





</div>



      </div>
    );
}

export default Login2;
