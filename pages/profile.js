import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/db';
const Profile = () => {

    const user = supabase.auth.user();
    console.log("Auth ----------->", user);
    const [userdata, setUserdata] = useState({});

    //find currentuser date from user table

    useEffect(() => {
     
      currentuser();

    }, [])


const currentuser = async () => {

    const { data, error } = await  supabase
    .from('users')
    .select('*')
    .eq('id', user?.id);
    console.log("data", data);



}



    return (
      <div>

<h1>Profile</h1>


      </div>
    );
}

export default Profile;
