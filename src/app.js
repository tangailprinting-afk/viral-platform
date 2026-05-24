import { createPost }

from "./posts/createPost.js";

import { loadFeed }

from "./feed/loadFeed.js";

import { renderFeed }

from "./feed/renderFeed.js";

import { startRealtimeFeed }

from "./realtime/realtimeFeed.js";

import { googleLogin }

from "./auth/googleAuth.js";

import { watchAuthState }

from "./auth/session.js";

import { syncUser }

from "./auth/syncUser.js";


// APP ROOT

const app =
  document.getElementById("app");


// APP UI

app.innerHTML = `

  <div class="app">

    <!-- HEADER -->

    <header class="header">

      <div class="logo">

        Viral

      </div>


      <div class="header-icons">

        <button id="loginBtn">

          Login

        </button>

      </div>

    </header>


    <!-- RESPONSIVE LAYOUT -->

    <div class="layout">


      <!-- LEFT SIDEBAR -->

      <aside class="left-sidebar">

        <button>🏠</button>

        <button>🔥</button>

        <button>🔔</button>

        <button>💬</button>

        <button>👤</button>

      </aside>


      <!-- FEED -->

      <main class="feed">


        <!-- CREATE POST -->

        <div class="create-post">

          <textarea
            id="postInput"
            placeholder="কি ভাবছেন?"
          ></textarea>


          <input
            type="file"
            id="imageInput"
          />


          <button id="postBtn">

            পোস্ট করুন

          </button>

        </div>


        <!-- POSTS -->

        <div id="feed"></div>

      </main>


      <!-- RIGHT SIDEBAR -->

      <aside class="right-sidebar">


        <div class="sidebar-card">

          <h3>

            🔥 Trending Creators

          </h3>


          <p>

            Coming Soon

          </p>

        </div>


        <div class="sidebar-card">

          <h3>

            💎 Creator Rank

          </h3>


          <p>

            Weekly Rankings

          </p>

        </div>


        <div class="sidebar-card">

          <h3>

            🚀 Viral Posts

          </h3>


          <p>

            Top Trending Feed

          </p>

        </div>

      </aside>

    </div>


    <!-- MOBILE NAV -->

    <nav class="bottom-nav">

      <button>🏠</button>

      <button>🔍</button>

      <button class="add-btn">

        ➕

      </button>

      <button>🔥</button>

      <button>👤</button>

    </nav>

  </div>

`;


// ELEMENTS

const postBtn =
  document.getElementById("postBtn");

const postInput =
  document.getElementById("postInput");

const imageInput =
  document.getElementById("imageInput");

const feedContainer =
  document.getElementById("feed");

const loginBtn =
  document.getElementById("loginBtn");


// LOGIN

loginBtn.addEventListener(

  "click",

  async () => {

    await googleLogin();

  }

);


// AUTH STATE

watchAuthState(

  async user => {

    if(user){

      loginBtn.innerText =
        user.displayName;


      console.log(
        "CALLING SYNC USER"
      );

      await syncUser(user);

    }

    else{

      loginBtn.innerText =
        "Login";

    }

  }

);


// INITIAL FEED

initFeed();


// REALTIME FEED

startRealtimeFeed({

  onNewPost: async () => {

    await initFeed();

  }

});


// CREATE POST

postBtn.addEventListener(

  "click",

  async () => {

    const text =
      postInput.value.trim();

    const file =
      imageInput.files[0];


    if(!text && !file){

      alert("কিছু লিখুন");

      return;

    }


    postBtn.disabled = true;

    postBtn.innerText =
      "Uploading...";


    const success =
      await createPost({

        text,
        file

      });


    postBtn.disabled = false;

    postBtn.innerText =
      "পোস্ট করুন";


    if(!success){

      alert("Post Failed");

      return;

    }


    postInput.value = "";

    imageInput.value = "";


    await initFeed();

  }

);


// LOAD + RENDER FEED

async function initFeed(){

  const posts =
    await loadFeed();

  renderFeed({

    posts,

    container:
      feedContainer

  });

}