import { supabaseClient }

from "../api/supabase.js";


export async function createNotification({

  receiverUid,

  senderUid,

  senderName,

  senderAvatar,

  type,

  postId,

  message

}){

  try{

    // SELF NOTIFICATION BLOCK

    if(receiverUid === senderUid){

      return false;

    }


    const { error } =

      await supabaseClient

      .from("notifications")

      .insert([

        {

          receiver_uid:
            receiverUid,

          sender_uid:
            senderUid,

          sender_name:
            senderName,

          sender_avatar:
            senderAvatar,

          type:
            type,

          post_id:
            postId,

          message:
            message

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