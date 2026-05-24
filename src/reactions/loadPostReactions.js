import { supabaseClient }

from "../api/supabase.js";


export async function loadPostReactions(

  postId

){

  try{

    const {

      data:reactions,

      error

    }

    = await supabaseClient

      .from("reactions")

      .select("*")

      .eq(

        "post_id",

        postId

      )


      .order(

        "created_at",

        {

          ascending:false

        }

      );


    if(error){

      console.log(error);

      return [];

    }


    return reactions || [];

  }

  catch(err){

    console.log(err);

    return [];

  }

}