import {

  GoogleAuthProvider,

  signInWithPopup

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import { auth }

from "../api/firebase.js";


const provider =
  new GoogleAuthProvider();


export async function googleLogin(){

  try{

    const result =

      await signInWithPopup(

        auth,

        provider

      );


    console.log(

      "Google Login Success",

      result.user

    );


    return result.user;

  }

  catch(err){

    console.log(err);

    return null;

  }

}