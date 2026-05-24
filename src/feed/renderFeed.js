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

      <div class="post-top">


        <img

          class="avatar"

          src="${
            post.avatar
            ||
            'https://placehold.co/100'
          }"

        />


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


      <div class="post-content">

        ${
          post.content
          ||
          ""
        }

      </div>


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