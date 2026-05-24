import { supabaseClient }

from "../api/supabase.js";


export async function syncUser(

  user

){

  try{

    // CHECK EXISTING USER

    const { data:existingUser }

      = await supabaseClient

      .from("users")

      .select("*")

      .eq(

        "firebase_uid",

        user.uid

      )

      .single();


    // USER EXISTS

    if(existingUser){

      console.log(

        "User Already Exists"

      );

      return existingUser;

    }


    // CREATE NEW USER

    const username =

      user.displayName
      ||
      "Creator";


    const { data,error }

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


    if(error){

      console.log(error);

      return null;

    }


    console.log(

      "New User Created",

      data

    );

    return data;

  }

  catch(err){

    console.log(err);

    return null;

  }

}