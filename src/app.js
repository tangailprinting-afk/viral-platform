import { openNotificationPanel }

from "./notifications/notificationPanel.js";

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


        <button>

          <i data-lucide="house"></i>

        </button>


        <button>

          <i data-lucide="flame"></i>

        </button>


        <button class="notification-btn">

          <i data-lucide="bell"></i>

        </button>


        <button>

          <i data-lucide="messages-square"></i>

        </button>


        <button>

          <i data-lucide="user"></i>

        </button>

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


      <button>

        <i data-lucide="house"></i>

      </button>


      <button>

        <i data-lucide="search"></i>

      </button>


      <button class="add-btn">

        <i data-lucide="plus"></i>

      </button>


      <button class="notification-btn">

        <i data-lucide="bell"></i>

      </button>


      <button>

        <i data-lucide="user"></i>

      </button>

    </nav>

  </div>

`;


// ACTIVATE SVG ICONS

lucide.createIcons();


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


// ALL NOTIFICATION BUTTONS

const notificationButtons =

  document.querySelectorAll(
    ".notification-btn"
  );


// NOTIFICATION EVENTS

notificationButtons.forEach(btn => {

  btn.addEventListener(

    "click",

    () => {

      openNotificationPanel();

    }

  );

});


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