import { supabaseClient }

from "../api/supabase.js";


export function startRealtimeFeed({

  onNewPost

}){

  const channel =

    supabaseClient

    .channel("realtime-feed")


    .on(

      "postgres_changes",

      {
        event:"INSERT",
        schema:"public",
        table:"posts"
      },

      payload => {

        console.log(

          "Realtime Post",

          payload

        );


        if(onNewPost){

          onNewPost(payload);

        }

      }

    )


    .subscribe(status => {

      console.log(

        "Realtime Status:",

        status

      );

    });


  return channel;

}