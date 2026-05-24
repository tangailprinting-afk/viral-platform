import { supabaseClient }

from "../api/supabase.js";

import { uploadImage }

from "../api/cloudinary.js";


export async function createPost({

  text,

  file

}){

  try{

    let imageUrl = "";


    // IMAGE UPLOAD

    if(file){

      imageUrl =
        await uploadImage(file);

    }


    // DATABASE INSERT

    const { error } =

      await supabaseClient

      .from("posts")

      .insert([

        {
          content:text,
          image_url:imageUrl
        }

      ]);


    if(error){

      console.log(error);

      return false;

    }


    return true;

  }

  catch(err){

    console.log(err);

    return false;

  }

}