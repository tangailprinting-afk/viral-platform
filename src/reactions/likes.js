import { supabaseClient }

from "../api/supabase.js";


export async function likePost(

  postId,

  currentLikes = 0

){

  try{

    const newLikes =
      currentLikes + 1;


    const { error } =

      await supabaseClient

      .from("posts")

      .update({

        likes:newLikes

      })

      .eq(

        "id",

        postId

      );


    if(error){

      console.log(error);

      return false;

    }


    return newLikes;

  }

  catch(err){

    console.log(err);

    return false;

  }

}