import { supabaseClient }

from "../api/supabase.js";


export async function loadComments(

  postId

){

  try{

    const { data,error }

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

          ascending:true

        }

      );


    if(error){

      console.log(error);

      return [];

    }


    return data || [];

  }

  catch(err){

    console.log(err);

    return [];

  }

}