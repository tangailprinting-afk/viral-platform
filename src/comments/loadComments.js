import { supabaseClient }

from "../api/supabase.js";


export async function loadComments(

  postId

){

  try{

    const {

      data:comments,

      error

    }

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


    // MAIN COMMENTS

    const mainComments =

      comments.filter(

        comment =>

          !comment.parent_comment_id

      );


    // ATTACH REPLIES

    mainComments.forEach(comment => {

      comment.replies =

        comments.filter(

          reply =>

            reply.parent_comment_id
            ===
            comment.id

        );

    });


    return mainComments;

  }

  catch(err){

    console.log(err);

    return [];

  }

}