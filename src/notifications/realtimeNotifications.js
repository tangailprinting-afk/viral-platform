import { supabaseClient }

from "../api/supabase.js";


export function startRealtimeNotifications({

  firebaseUid,

  onNewNotification

}){

  const channel =

    supabaseClient

    .channel(

      `notifications-${firebaseUid}`

    )


    .on(

      "postgres_changes",

      {

        event:"INSERT",

        schema:"public",

        table:"notifications",

        filter:`receiver_uid=eq.${firebaseUid}`

      },

      payload => {

        console.log(

          "Realtime Notification",

          payload

        );


        if(onNewNotification){

          onNewNotification(payload);

        }

      }

    )


    .subscribe(status => {

      console.log(

        "Notifications Realtime:",

        status

      );

    });


  return channel;

}