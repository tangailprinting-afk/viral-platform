import { supabaseClient }

from "../api/supabase.js";

import { getCurrentUser }

from "../auth/session.js";


export async function reactToPost({

  postId,

  reactionType

}){

  try{

    const currentUser =
      getCurrentUser();


    // LOGIN REQUIRED

    if(!currentUser){

      alert("Login Required");

      return false;

    }


    // CHECK EXISTING REACTION

    const {

      data:existingReaction

    }

    = await supabaseClient

      .from("reactions")

      .select("*")

      .eq(

        "post_id",

        postId

      )

      .eq(

        "firebase_uid",

        currentUser.uid

      )

      .maybeSingle();


    // REMOVE SAME REACTION

    if(

      existingReaction
      &&
      existingReaction.reaction_type
      ===
      reactionType

    ){

      await supabaseClient

        .from("reactions")

        .delete()

        .eq(

          "id",

          existingReaction.id

        );


      return {

        removed:true

      };

    }


    // UPDATE REACTION

    if(existingReaction){

      await supabaseClient

        .from("reactions")

        .update({

          reaction_type:
            reactionType

        })

        .eq(

          "id",

          existingReaction.id

        );


      return {

        updated:true

      };

    }


    // INSERT NEW REACTION

    const { error } =

      await supabaseClient

      .from("reactions")

      .insert([

        {

          post_id:
            postId,

          firebase_uid:
            currentUser.uid,

          username:
            currentUser.displayName,

          avatar:
            currentUser.photoURL,

          reaction_type:
            reactionType

        }

      ]);


    if(error){

      console.log(error);

      return false;

    }


    return {

      added:true

    };

  }

  catch(err){

    console.log(err);

    return false;

  }

}