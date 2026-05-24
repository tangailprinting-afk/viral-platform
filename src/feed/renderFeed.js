import { loadPreviewComments }

from "../comments/loadPreviewComments.js";

import { loadPostReactions }

from "../reactions/loadPostReactions.js";

import { buildReactionSummary }

from "../reactions/buildReactionSummary.js";

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

import { openProfile }

from "../users/profile.js";


export async function renderFeed({

  posts,

  container,

  append = false

}){

  if(!append){

    container.innerHTML = "";

  }


  for(const post of posts){


    // LOAD REACTIONS

    const reactions =

      await loadPostReactions(
        post.id
      );


    // BUILD SUMMARY

    const reactionSummary =

      buildReactionSummary(
        reactions
      );


    // REACTION MAP

    const reactionEmojiMap = {

      like:"👍",

      love:"❤️",

      haha:"😂",

      wow:"😮",

      sad:"😢",

      angry:"😡",

      fire:"🔥"

    };


    // TOP REACTIONS

    const topReactionIcons =

      reactionSummary.topReactions

      .map(type =>

        `<span>${
          reactionEmojiMap[type]
        }</span>`

      )

      .join("");


    // WHO REACTED

    const whoReacted =

      reactions

      .slice(0,2)

      .map(r => r.username)

      .join(", ");




// LOAD COMMENT PREVIEW

const previewComments =

  await loadPreviewComments(
    post.id
  );


    // CREATE POST ELEMENT

    const postElement =
      document.createElement("div");


    postElement.className =
      "post-card";


    // HTML

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

            ${
              topReactionIcons
              ||
              ""
            }

          </div>


          <div class="reaction-count">

            ${
              reactionSummary.total
            }

          </div>


          <div class="who-reacted">

            ${
              whoReacted
              ||
              "No reactions yet"
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



<!-- COMMENT PREVIEW -->

<div class="comment-preview-list">

  ${
    previewComments

    .map(comment => `

      <div class="preview-comment">


        <img

          class="preview-avatar"

          src="${
            comment.avatar
            ||
            "https://placehold.co/100"
          }"

        />


        <div class="preview-body">

          <strong>

            ${
              comment.username
            }

          </strong>


          <p>

            ${
              comment.content
            }

          </p>

        </div>

      </div>

    `)

    .join("")

  }

</div>



      <!-- ACTION BAR -->

      <div class="post-actions">


        <!-- REACTION -->

        <div class="reaction-wrapper">


          <button
            class="action-btn react-btn"
          >

            <i data-lucide="heart"></i>

          </button>


          <!-- POPUP -->

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


    if(topSection){

      topSection.addEventListener(

        "click",

        () => {

          openProfile({

            user:{

              username:
                post.username,

              avatar:
                post.avatar,

              firebase_uid:
                post.firebase_uid

            }

          });

        }

      );

    }


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

// CREATE REACTION NOTIFICATION

const currentUser =
  getCurrentUser();


if(

  currentUser
  &&
  currentUser.uid !==
  post.firebase_uid

){

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
      "reaction",

    postId:
      post.id,

    message:
      `reacted with ${reactionEmojiMap[reactionType]}`

  });

}



          // SIMPLE LIVE UPDATE

          const reactionCountEl =

            postElement.querySelector(
              ".reaction-count"
            );


          let currentCount =

            parseInt(
              reactionCountEl.innerText
            ) || 0;


          if(result?.added){

            currentCount++;

          }


          if(result?.removed){

            currentCount--;

          }


          reactionCountEl.innerText =
            currentCount;

        }

      );

    });


    // COMMENT BUTTON

    const commentBtn =

      postElement.querySelector(
        ".comment-btn"
      );


    if(commentBtn){

      commentBtn.addEventListener(

        "click",

        () => {

          openCommentSheet({

            postId:
              post.id

          });

        }

      );

    }


    // SHARE BUTTON

    const shareBtn =

      postElement.querySelector(
        ".share-btn"
      );


    if(shareBtn){

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

            const summaryCount =

              postElement.querySelector(
                ".reaction-right span:last-child"
              );


            let currentShares = 0;


            if(summaryCount){

              currentShares =

                parseInt(

                  summaryCount.innerText

                ) || 0;

            }


            const newShares =

              await updateShareCount(

                post.id,

                currentShares

              );


            if(newShares !== false){

              summaryCount.innerText =

                `${newShares} shares`;


              shareBtn.classList.add(
                "liked"
              );


              setTimeout(() => {

                shareBtn.classList.remove(
                  "liked"
                );

              },300);

            }


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
                  "share",

                postId:
                  post.id,

                message:
                  "shared your post 🚀"

              });

            }

          }

        }

      );

    }


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

  }

}