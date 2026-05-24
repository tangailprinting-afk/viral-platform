import { supabaseClient }

from "../api/supabase.js";


export async function loadNotifications(

  firebaseUid

){

  try{

    const { data,error }

      = await supabaseClient

      .from("notifications")

      .select("*")

      .eq(

        "receiver_uid",

        firebaseUid

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


    return data || [];

  }

  catch(err){

    console.log(err);

    return [];

  }

}