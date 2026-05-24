import { supabaseClient }

from "../api/supabase.js";

import { getCurrentUser }

from "../auth/session.js";


export async function replyToComment({

  postId,

  parentCommentId,

  text

}){

  try{

    const currentUser =
      getCurrentUser();


    if(!currentUser){

      alert("Login Required");

      return false;

    }


    const { error } =

      await supabaseClient

      .from("comments")

      .insert([

        {

          post_id:
            postId,

          parent_comment_id:
            parentCommentId,

          firebase_uid:
            currentUser.uid,

          username:
            currentUser.displayName,

          avatar:
            currentUser.photoURL,

          content:
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