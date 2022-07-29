import React from "react";
import { supabase } from "../utils/db";
import { useState, useEffect } from "react";
const Upload = () => {
  const [file, setFile] = useState("");

  const uploadImage = async (e) => {
    // upload image to  supabase storage
    const image = e.target.files[0];
    console.log("image", image);

    const { data, error } = await supabase.storage
      .from("my-storage")
      .upload(`${image?.name}`, image);
   

      const { data:imageData, error:imageError } = await supabase.storage.from('my-storage').getPublicUrl(`${image?.name}`)
      //download(image?.name)

      setFile(imageData);
      console.log("File---->", file);

    console.log('imageData', imageData)
    console.log('imageError', imageError)


  };

  return (
    <div>
      <div className=" w-[200px]   my-12 mx-12">
        <h1>
          <input
            type="file"
            name="file"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="your@email.com"
            id="website"
            // value={email}
            onChange={uploadImage}
          />

          <div>
            <img className=" rounded-full w-24 h-24" src={file?.publicURL} alt="" />
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Upload;
