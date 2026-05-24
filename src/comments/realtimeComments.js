import { supabaseClient }

from "../api/supabase.js";


export function startRealtimeComments({

  postId,

  onNewComment

}){

  const channel =

    supabaseClient

    .channel(

      `comments-${postId}`

    )


    .on(

      "postgres_changes",

      {

        event:"INSERT",

        schema:"public",

        table:"comments",

        filter:`post_id=eq.${postId}`

      },

      payload => {

        console.log(

          "Realtime Comment",

          payload

        );


        if(onNewComment){

          onNewComment(payload);

        }

      }

    )


    .subscribe(status => {

      console.log(

        "Comments Realtime:",

        status

      );

    });


  return channel;

}