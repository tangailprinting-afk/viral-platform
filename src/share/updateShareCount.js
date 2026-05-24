import { supabaseClient }

from "../api/supabase.js";


export async function updateShareCount(

  postId,

  currentShares

){

  try{

    const newCount =
      currentShares + 1;


    const { error } =

      await supabaseClient

      .from("posts")

      .update({

        shares:newCount

      })

      .eq(

        "id",

        postId

      );


    if(error){

      console.log(error);

      return false;

    }


    return newCount;

  }

  catch(err){

    console.log(err);

    return false;

  }

}