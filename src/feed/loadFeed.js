import { supabaseClient }

from "../api/supabase.js";


export async function loadFeed({

  limit = 10,

  offset = 0

} = {}){

  try{

    // POSTS

    const {

      data:posts,

      error

    }

    = await supabaseClient

      .from("posts")

      .select("*")

      .order(

        "created_at",

        {

          ascending:false

        }

      )

      .range(

        offset,

        offset + limit - 1

      );


    if(error){

      console.log(error);

      return [];

    }


    // SHARES

    const {

      data:shares

    }

    = await supabaseClient

      .from("shares")

      .select("*")

      .order(

        "created_at",

        {

          ascending:false

        }

      );


    // REPOST FEED

    const repostFeed = [];


    shares?.forEach(share => {

      const originalPost =

        posts.find(

          post =>

            post.id ===
            share.post_id

        );


      if(originalPost){

        repostFeed.push({

          ...originalPost,

          reposted_by:
            share.username,

          repost_avatar:
            share.avatar,

          reposted:true,

          repost_time:
            share.created_at

        });

      }

    });


    // MERGE

    const mergedFeed = [

      ...repostFeed,

      ...posts

    ];


    // SORT

    mergedFeed.sort(

      (a,b) => {

        const dateA =

          new Date(

            a.repost_time
            ||
            a.created_at

          );

        const dateB =

          new Date(

            b.repost_time
            ||
            b.created_at

          );


        return dateB - dateA;

      }

    );


    return mergedFeed;

  }

  catch(err){

    console.log(err);

    return [];

  }

}