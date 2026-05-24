import {

  onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import { auth }

from "../api/firebase.js";


let currentUser = null;


export function watchAuthState(

  callback

){

  onAuthStateChanged(

    auth,

    user => {

      currentUser = user;

      console.log(

        "AUTH STATE:",

        user

      );


      if(callback){

        callback(user);

      }

    }

  );

}


export function getCurrentUser(){

  return currentUser;

}