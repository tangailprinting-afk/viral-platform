import { supabaseClient }

from "../api/supabase.js";


export async function loadPreviewComments(

  postId

){

  try{

    const {

      data:comments,

      error

    }

    = await supabaseClient

      .from("comments")

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

      )

      .limit(2);


    if(error){

      console.log(error);

      return [];

    }


    return comments || [];

  }

  catch(err){

    console.log(err);

    return [];

  }

}