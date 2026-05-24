import { createNotification }

from "../notifications/createNotification.js";

import { getCurrentUser }

from "../auth/session.js";

import { openCommentSheet }

from "../comments/commentSheet.js";

import { openImageViewer }

from "../images/imageViewer.js";

import { likePost }

from "../reactions/likes.js";

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


        <!-- LIKE -->

        <button
          class="action-btn like-btn"
        >

          ❤️

          <span>

            ${
              post.likes
              ||
              0
            }

          </span>

        </button>


        <!-- COMMENT -->

        <button
          class="action-btn comment-btn"
        >

          💬 Comment

        </button>


        <!-- BOOST -->

        <button
          class="action-btn"
        >

          🚀 Boost

        </button>


        <!-- SAVE -->

        <button
          class="action-btn"
        >

          🔖 Save

        </button>

      </div>

    `;


    // PROFILE OPEN

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


    // COMMENT BUTTON

    const commentBtn =

      postElement.querySelector(
        ".comment-btn"
      );


    commentBtn.addEventListener(

      "click",

      () => {

        openCommentSheet({

          postId:
            post.id

        });

      }

    );


    // LIKE BUTTON

    const likeBtn =

      postElement.querySelector(
        ".like-btn"
      );


    likeBtn.addEventListener(

      "click",

      async () => {

        const likeCount =

          parseInt(

            likeBtn.querySelector(
              "span"
            ).innerText

          );


        const newLikes =

          await likePost(

            post.id,

            likeCount

          );


        if(newLikes !== false){


          // UPDATE UI

          likeBtn.querySelector(
            "span"
          ).innerText = newLikes;


          // ANIMATION

          likeBtn.classList.add(
            "liked"
          );


          setTimeout(() => {

            likeBtn.classList.remove(
              "liked"
            );

          },300);


          // NOTIFICATION

          const currentUser =
            getCurrentUser();


          if(currentUser){

            await createNotification({

              receiverUid:
                post.firebase_uid,

              senderUid:
                currentUser.uid,

              senderName:
                currentUser.displayName,

              senderAvatar:
                currentUser.photoURL,

              type:
                "like",

              postId:
                post.id,

              message:
                "liked your post ❤️"

            });

          }

        }

      }

    );


    // IMAGE VIEWER

    const postImage =

      postElement.querySelector(
        ".post-image"
      );


    if(postImage){

      postImage.addEventListener(

        "click",

        () => {

          openImageViewer(
            post.image_url
          );

        }

      );

    }


    // APPEND

    container.appendChild(
      postElement
    );

  });

}