import { supabaseClient }

from "../api/supabase.js";

import { getCurrentUser }

from "../auth/session.js";


export async function addComment({

  postId,

  text

}){

  try{

    const currentUser =
      getCurrentUser();


    // LOGIN REQUIRED

    if(!currentUser){

      alert(
        "Login Required"
      );

      return false;

    }


    // EMPTY COMMENT

    if(!text.trim()){

      return false;

    }


    // INSERT COMMENT

    const { error } =

      await supabaseClient

      .from("comments")

      .insert([

        {

          post_id:
            postId,

          firebase_uid:
            currentUser.uid,

          username:
            currentUser.displayName,

          avatar:
            currentUser.photoURL,

          comment:
            text

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