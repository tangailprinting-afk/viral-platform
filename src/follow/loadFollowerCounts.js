import { supabaseClient }

from "../api/supabase.js";


export async function loadFollowerCounts(

  firebaseUid

){

  try{

    // FOLLOWERS COUNT

    const {

      count:followersCount

    }

    = await supabaseClient

      .from("followers")

      .select("*",{

        count:"exact",

        head:true

      })

      .eq(

        "following_uid",

        firebaseUid

      );


    // FOLLOWING COUNT

    const {

      count:followingCount

    }

    = await supabaseClient

      .from("followers")

      .select("*",{

        count:"exact",

        head:true

      })

      .eq(

        "follower_uid",

        firebaseUid

      );


    return {

      followers:
        followersCount || 0,

      following:
        followingCount || 0

    };

  }

  catch(err){

    console.log(err);

    return {

      followers:0,

      following:0

    };

  }

}