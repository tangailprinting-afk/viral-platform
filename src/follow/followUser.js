import { supabaseClient }

from "../api/supabase.js";

import { getCurrentUser }

from "../auth/session.js";


export async function followUser(

  targetUid

){

  try{

    const currentUser =
      getCurrentUser();


    // LOGIN REQUIRED

    if(!currentUser){

      alert("Login Required");

      return false;

    }


    // SELF FOLLOW BLOCK

    if(currentUser.uid === targetUid){

      return false;

    }


    // CHECK EXISTING

    const {

      data:existing

    }

    = await supabaseClient

      .from("followers")

      .select("*")

      .eq(

        "follower_uid",

        currentUser.uid

      )

      .eq(

        "following_uid",

        targetUid

      )

      .maybeSingle();


    // UNFOLLOW

    if(existing){

      await supabaseClient

        .from("followers")

        .delete()

        .eq(

          "id",

          existing.id

        );


      return "unfollowed";

    }


    // FOLLOW

    const { error } =

      await supabaseClient

      .from("followers")

      .insert([

        {

          follower_uid:
            currentUser.uid,

          following_uid:
            targetUid

        }

      ]);


    if(error){

      console.log(error);

      return false;

    }


    return "followed";

  }

  catch(err){

    console.log(err);

    return false;

  }

}