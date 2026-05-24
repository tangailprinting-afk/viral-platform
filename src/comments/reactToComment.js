import { supabaseClient }

from "../api/supabase.js";

import { getCurrentUser }

from "../auth/session.js";


export async function reactToComment({

  commentId,

  reactionType

}){

  try{

    const currentUser =
      getCurrentUser();


    if(!currentUser){

      alert("Login Required");

      return false;

    }


    // CHECK EXISTING

    const {

      data:existingReaction

    }

    = await supabaseClient

      .from("comment_reactions")

      .select("*")

      .eq(

        "comment_id",

        commentId

      )

      .eq(

        "firebase_uid",

        currentUser.uid

      )

      .maybeSingle();


    // REMOVE SAME

    if(

      existingReaction
      &&
      existingReaction.reaction_type
      ===
      reactionType

    ){

      await supabaseClient

        .from("comment_reactions")

        .delete()

        .eq(

          "id",

          existingReaction.id

        );


      return {

        removed:true

      };

    }


    // UPDATE

    if(existingReaction){

      await supabaseClient

        .from("comment_reactions")

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


    // INSERT

    const { error } =

      await supabaseClient

      .from("comment_reactions")

      .insert([

        {

          comment_id:
            commentId,

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