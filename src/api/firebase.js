import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { CONFIG }

from "../config.js";


const firebaseApp =

  initializeApp(
    CONFIG.FIREBASE_CONFIG
  );


export const auth =

  getAuth(firebaseApp);


console.log(
  "Firebase Module Ready"
);