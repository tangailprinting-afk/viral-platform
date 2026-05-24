import { reactToPost }

from "../reactions/reactToPost.js";


import { sharePost }

from "../share/sharePost.js";

import { updateShareCount }

from "../share/updateShareCount.js";

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


${
  post.reposted
  ?
  `
    <div class="repost-header">

      <i data-lucide="repeat-2"></i>

      <span>

        ${post.reposted_by}
        reposted this

      </span>

    </div>
  `
  :
  ""
}


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

<!-- REACTION SUMMARY -->

<div class="reaction-summary">


  <div class="reaction-left">

    <div class="reaction-icons">

      <span>👍</span>

      <span>❤️</span>

      <span>😂</span>

      <span>😮</span>

    </div>


    <div class="reaction-count">

      ${
        post.reactions_count
        ||
        0
      }

    </div>

  </div>


  <div class="reaction-right">

    <span>

      ${
        post.comments_count
        ||
        0
      } comments

    </span>


    <span>

      ${
        post.shares_count
        ||
        0
      } shares

    </span>

  </div>

</div>


<!-- ACTION BAR -->

<div class="post-actions">


  <!-- REACT -->

  <div class="reaction-wrapper">


    <button
      class="action-btn react-btn"
    >

      <i data-lucide="heart"></i>

    </button>


    <!-- REACTION POPUP -->

    <div class="reaction-popup">


      <button
        class="reaction-option"
        data-reaction="like"
      >

        👍

      </button>


      <button
        class="reaction-option"
        data-reaction="love"
      >

        ❤️

      </button>


      <button
        class="reaction-option"
        data-reaction="haha"
      >

        😂

      </button>


      <button
        class="reaction-option"
        data-reaction="wow"
      >

        😮

      </button>


      <button
        class="reaction-option"
        data-reaction="sad"
      >

        😢

      </button>


      <button
        class="reaction-option"
        data-reaction="angry"
      >

        😡

      </button>


      <button
        class="reaction-option"
        data-reaction="fire"
      >

        🔥

      </button>

    </div>

  </div>


  <!-- COMMENT -->

  <button
    class="action-btn comment-btn"
  >

    <i data-lucide="message-circle"></i>

  </button>


  <!-- SHARE -->

  <button
    class="action-btn share-btn"
  >

    <i data-lucide="send"></i>

  </button>


  <!-- BOOST -->

  <button
    class="action-btn boost-btn"
  >

    <i data-lucide="zap"></i>

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

// REACTION SYSTEM

const reactionOptions =

  postElement.querySelectorAll(
    ".reaction-option"
  );


reactionOptions.forEach(option => {

  option.addEventListener(

    "click",

    async () => {

      const reactionType =

        option.dataset.reaction;


      const result =

        await reactToPost({

          postId:
            post.id,

          reactionType

        });


      console.log(result);

    }

  );

});



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

// SHARE BUTTON

const shareBtn =

  postElement.querySelector(
    ".share-btn"
  );


shareBtn.addEventListener(

  "click",

  async () => {

    const result =

      await sharePost(
        post.id
      );


    if(result === "already_shared"){

      alert(
        "Already Shared"
      );

      return;

    }


    if(result === "shared"){

      const shareCount =

        parseInt(

          shareBtn.querySelector(
            "span"
          ).innerText

        );


      const newShares =

        await updateShareCount(

          post.id,

          shareCount

        );


      if(newShares !== false){

        shareBtn.querySelector(
          "span"
        ).innerText = newShares;


        // SHARE ANIMATION

        shareBtn.classList.add(
          "liked"
        );


        setTimeout(() => {

          shareBtn.classList.remove(
            "liked"
          );

        },300);

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

// RENDER SVG ICONS

lucide.createIcons();

    // APPEND

    container.appendChild(
      postElement
    );

  });

}