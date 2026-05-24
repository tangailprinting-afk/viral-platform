import { supabaseClient }

from "../api/supabase.js";


export async function markNotificationsRead(

  firebaseUid

){

  try{

    const { error } =

      await supabaseClient

      .from("notifications")

      .update({

        is_read:true

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

      return false;

    }


    return true;

  }

  catch(err){

    console.log(err);

    return false;

  }

}