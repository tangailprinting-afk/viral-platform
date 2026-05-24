import { openProfile }

from "../users/profile.js";


export function renderFeed({

  posts,

  container

}){

  container.innerHTML = "";


  posts.forEach(post => {

    const postElement =
      document.createElement("div");


    postElement.className =
      "post-card";


    postElement.innerHTML = `

      <!-- POST TOP -->

      <div class="post-top">


        <!-- AVATAR -->

        <img

          class="avatar"

          src="${
            post.avatar
            ||
            'https://placehold.co/100'
          }"

        />


        <!-- USER -->

        <div class="post-user">

          <h3>

            ${
              post.username
              ||
              "Creator"
            }

          </h3>


          <span>

            🔥 Live Creator

          </span>

        </div>

      </div>


      <!-- CONTENT -->

      <div class="post-content">

        ${
          post.content
          ||
          ""
        }

      </div>


      <!-- IMAGE -->

      ${
        post.image_url
        ?
        `
          <img
            class="post-image"
            src="${post.image_url}"
          />
        `
        :
        ""
      }


      <!-- ACTIONS -->

      <div class="post-actions">


        <button class="action-btn">

          ❤️ Like

        </button>


        <button class="action-btn">

          💬 Comment

        </button>


        <button class="action-btn">

          🚀 Boost

        </button>


        <button class="action-btn">

          🔖 Save

        </button>

      </div>

    `;


    // OPEN PROFILE

    const topSection =

      postElement.querySelector(
        ".post-top"
      );


    topSection.addEventListener(

      "click",

      () => {

        openProfile({

          user:{

            username:
              post.username,

            avatar:
              post.avatar

          }

        });

      }

    );


    container.appendChild(
      postElement
    );

  });

}