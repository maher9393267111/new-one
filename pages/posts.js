import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../utils/db";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: "", content: "" });
  const [userdata, setUserdata] = useState([]);
  const user = supabase.auth.user();
  console.log("Auth ----------->", user);





useEffect(() => {

    const userdata = localStorage.getItem('useris')
  
    setUserdata(JSON.parse(userdata))
 // JSON.parse(userdata)
   
  
  
  }, []);
  




  //console.log(supabase?.auth()?.user);
  async function handleSubmit(e) {
    console.log('🛹🛹🛹🛹', userdata?.id)
    e.preventDefault();
    const {data ,error} = await supabase
      .from("posts")
      .insert(
        { title: post.title, content: post.content ,profile_id: supabase.auth.user()?.id },
      )
    

        console.log("inserted",data);
      await  getPosts();
    
    
      if ( error)   console.log("err", error);
     
  }





// fetch All posts
    async function getPosts() {

      await supabase.from("posts").select("*, profile_id (first_name,last_name)").eq("profile_id", user?.id).
      then((data) => {
        console.log("data", data);
        setPosts(data.data);
        console.log("posts🌙🌙🌙------>", posts);
      })

    }


    useEffect(() => {

        getPosts();

    }, []);



    // upsaer messages

    const sendMessages = async (e) => {

        const { data, error } = await supabase
        .from('messages')
        .upsert([
        { id: 5, message: 'kaka', username: 'supabot' },
        { id: 6, message: 'ronaldo', username: 'supabot' }
        ])

    }



// find where

const Searchtext = async (e) => {
const textis = 'ro'

    const { data, error } = await supabase
    .from('messages')
    .select()
  .like('message', `%${textis}%`)

    console.log("data", data);


}

const SearhOR = async (e) => {
    const textis2 = 'ronaldo'
    const textis1 = 'kaka'
    
        const { data, error } = await supabase
        .from('messages')
        .select()
        .or(`message.eq.${textis1}`, `message.eq.${textis2}`)
    
        console.log("data", data);
    
    
    }
    





// delete post where id = 1

    async function deletePost() {

        await supabase.from("posts").delete({ id: 2  }).match({ title : "post Title two"})  
       // .eq("id", 1)
        .then((data) => {
            console.log(" post deleted");
            getPosts();
        })
    

    }



  return (
    <div>
      <h1>Posts {user?.email} </h1>

      <div className=" w-[200px] mx-auto my-4">
        <input
          type="text"
          name="email"
          class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Content"
          id="website"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
      </div>

      <div className=" w-[200px] mx-auto my-4">
        <input
          type="text"
          placeholder="Post Title"
          name="email"
          class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="website"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </div>

      <div className=" text-center">
        <button
          className=" bg-blue-600 text-white text-center p-2 inline-block w-[200px] mx-auto my-4 rounded-full "
          onClick={handleSubmit}
        >
          {" "}
          send post
        </button>


        <button
          className=" bg-red-600 text-white text-center p-2 inline-block w-[200px] mx-auto my-4 mx-2 rounded-full "
          onClick={deletePost}
        >
          {" "}
          Delete post
        </button>


      </div>

<div>

    <button
     className=" bg-red-600 text-white text-center p-2 inline-block w-[200px] my-4 mx-2 "
    onClick={sendMessages}
    >
        Send Messages
    </button>
</div>




<div>

    <button
     className=" bg-red-600 text-white text-center p-2 inline-block w-[200px] my-4 mx-2 "
    onClick={Searchtext}
    >
        Search Text
    </button>
</div>

<div>

    <button
     className="  bg-fuchsia-400 text-white text-center p-2 inline-block w-[200px] my-4 mx-2 "
    onClick={SearhOR}
    >
        Search With Or
    </button>
</div>






<div>

{posts?.map((post) => (

<div>
    <p>{post?.profile_id?.first_name}</p>
    <p></p>
</div>
))}



</div>




    </div>
  );
};

export default Posts;