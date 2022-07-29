import React, {
    useState, useContext, useRef, useEffect,
  } from 'react';

  import { signUp } from '../utils/authFunctions';
  import { supabase } from '../utils/db'

  
  const Register = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const[username, setUsername] = useState('')
const[website, setWebsite] = useState('')
const[avatar_url, setAvatarUrl] = useState('')
const[loading, setLoading] = useState(false)
const[error, setError] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [userdata, setUserdata] = useState({})

const user1 = supabase.auth.user();
console.log("user111", user1);


const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setError({});
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setError({});
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError({});
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError({});
  };



const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

// sign  then update users table

const {user ,error}  = await supabase.auth.signUp({
  email,
  password,
})

// save auth user in local storage
//localStorage.setItem('useris', JSON.stringify(user))

// setUserdata(user)
// console.log("user---------------------------->", userdata);



try{
const { userdata , error:usererror} = await supabase.from('users').update({
  username: `${firstName} ${lastName}`,
  last_name: lastName,
  first_name: firstName,
}).eq('id', user.id)
}catch(err){
  console.log('err', err)
}


      // const sig = await signUp(email, password, {
      //   first_name: firstName,
      //   last_name: lastName,
      // });
       
     
     // return;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };



    return (
      <div>
<h1>Register Page  :: {userdata?.id}</h1>



<div className=' w-[400px] mx-auto mt-24'>


<input type="email" 
              name="email" 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="your@email.com"
              id="website"
              value={email}
              onChange={handleEmail}
              />


<input type="text" 
              name="fitstName" 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="First Name"
              id="website"
              value={firstName}
              onChange={handleFirstName}
              />



<input type="text" 
              name="lastName" 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="Last Name"
              id="website"
              value={lastName}
              onChange={handleLastName}
              />


<input type="password" 
              name="password" 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              />

 <button
 type='submit'
 className=' bg-green-300 my-4 p-2   font-bold rounded-full  hover:bg-green-700 transition-all duration-400 ease-in-out'
    onClick={handleSignUp}
 >Register</button>

</div>

      </div>
    );
  }
  
  export default Register;
  