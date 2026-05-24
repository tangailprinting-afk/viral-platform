import { supabaseClient }

from "../api/supabase.js";


export async function loadNotificationCount(

  firebaseUid

){

  try{

    const { count,error }

      = await supabaseClient

      .from("notifications")

      .select("*",{

        count:"exact",

        head:true

      })

      .eq(

        "receiver_uid",

        firebaseUid

      )

      .eq(

        "is_read",

        false

      );


    if(error){

      console.log(error);

      return 0;

    }


    return count || 0;

  }

  catch(err){

    console.log(err);

    return 0;

  }

}