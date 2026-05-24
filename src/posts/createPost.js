import { supabaseClient }

from "../api/supabase.js";

import { uploadImage }

from "../api/cloudinary.js";

import { getCurrentUser }

from "../auth/session.js";


export async function createPost({

  text,

  file

}){

  try{

    // CURRENT USER

    const currentUser =
      getCurrentUser();


    // LOGIN REQUIRED

    if(!currentUser){

      alert(
        "Login Required"
      );

      return false;

    }


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

          image_url:imageUrl,


          // CREATOR DATA

          firebase_uid:
            currentUser.uid,

          username:
            currentUser.displayName,

          avatar:
            currentUser.photoURL

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