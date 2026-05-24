import { supabaseClient }

from "../api/supabase.js";


export function startRealtimeReactions({

  onReaction

}){

  const channel =

    supabaseClient

    .channel(

      "realtime-reactions"

    )


    .on(

      "postgres_changes",

      {

        event:"*",

        schema:"public",

        table:"reactions"

      },

      payload => {

        console.log(

          "Realtime Reaction",

          payload
        );


        if(onReaction){

          onReaction(payload);

        }

      }

    )


    .subscribe(status => {

      console.log(

        "Reaction Realtime:",

        status

      );

    });


  return channel;

}