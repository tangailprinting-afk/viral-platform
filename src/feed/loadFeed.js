import { supabaseClient }

from "../api/supabase.js";


export async function loadFeed(){

  const { data,error } =

    await supabaseClient

    .from("posts")

    .select("*")

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

  return data;

}