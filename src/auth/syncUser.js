import { supabaseClient }

from "../api/supabase.js";


console.log(
  "SYNC MODULE LOADED"
);


export async function syncUser(user){

  console.log(
    "SYNC USER STARTED"
  );

  try{

    // CHECK EXISTING USER

    const {

      data: existingUser,

      error: existingError

    }

    = await supabaseClient

      .from("users")

      .select("*")

      .eq(

        "firebase_uid",

        user.uid

      )

      .maybeSingle();


    console.log(
      "EXISTING USER:",
      existingUser
    );

    console.log(
      "EXISTING USER ERROR:",
      existingError
    );


    // USER EXISTS

    if(existingUser){

      console.log(
        "User Already Exists"
      );

      return existingUser;

    }


    // CREATE USERNAME

    const username =

      user.displayName
      ||
      "Creator";


    // CREATE NEW USER

    const {

      data,

      error

    }

    = await supabaseClient

      .from("users")

      .insert([

        {

          firebase_uid:
            user.uid,

          username:
            username,

          avatar:
            user.photoURL,

          email:
            user.email

        }

      ])

      .select()

      .single();


    // INSERT ERROR

    if(error){

      console.error(
        "USER INSERT ERROR:",
        error
      );

      alert(
        JSON.stringify(error)
      );

      return null;

    }


    console.log(
      "NEW USER CREATED:",
      data
    );

    return data;

  }

  catch(err){

    console.error(
      "SYNC USER CATCH ERROR:",
      err
    );

    return null;

  }

}