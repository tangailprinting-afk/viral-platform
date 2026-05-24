import { supabaseClient }

from "../api/supabase.js";

import { getCurrentUser }

from "../auth/session.js";


export async function sharePost(

  postId

){

  try{

    const currentUser =
      getCurrentUser();


    // LOGIN REQUIRED

    if(!currentUser){

      alert("Login Required");

      return false;

    }


    // CHECK EXISTING SHARE

    const {

      data:existingShare

    }

    = await supabaseClient

      .from("shares")

      .select("*")

      .eq(

        "post_id",

        postId

      )

      .eq(

        "firebase_uid",

        currentUser.uid

      )

      .maybeSingle();


    // ALREADY SHARED

    if(existingShare){

      return "already_shared";

    }


    // INSERT SHARE

    const { error } =

      await supabaseClient

      .from("shares")

      .insert([

        {

          post_id:
            postId,

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


    return "shared";

  }

  catch(err){

    console.log(err);

    return false;

  }

}