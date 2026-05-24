import { reactToComment }

from "./reactToComment.js";

import { replyToComment }

from "./replyToComment.js";

import { createNotification }

from "../notifications/createNotification.js";

import { getCurrentUser }

from "../auth/session.js";

import { startRealtimeComments }

from "./realtimeComments.js";

import { addComment }

from "./addComment.js";

import { loadComments }

from "./loadComments.js";


export async function openCommentSheet({

  postId,

  postOwnerUid = null

}){


  // REMOVE OLD SHEET

  const oldSheet =

    document.getElementById(
      "commentSheet"
    );


  if(oldSheet){

    oldSheet.remove();

  }


  // LOAD COMMENTS

  const comments =

    await loadComments(
      postId
    );


  // CREATE SHEET

  const sheet =
    document.createElement("div");


  sheet.id =
    "commentSheet";


  sheet.className =
    "comment-sheet";


  // HTML

  sheet.innerHTML = `

    <div class="comment-overlay"></div>


    <div class="comment-container">


      <!-- HEADER -->

      <div class="comment-header">

        <h3>

          💬 Comments

        </h3>


        <button
          class="close-comments"
        >

          ✖

        </button>

      </div>


      <!-- COMMENT LIST -->

      <div class="comment-list">

        ${
          comments.map(comment => `

            <div class="comment-item">


              <!-- AVATAR -->

              <img

                class="comment-avatar"

                src="${
                  comment.avatar
                  ||
                  "https://placehold.co/100"
                }"

              />


              <!-- BODY -->

              <div class="comment-body">


                <strong>

                  ${
                    comment.username
                    ||
                    "Creator"
                  }

                </strong>


                <p>

                  ${
                    comment.content
                  }

                </p>

<!-- COMMENT REACTIONS -->

<div class="comment-reactions">


  <button

    class="comment-react-btn"

    data-comment-id="${
      comment.id
    }"

  >

    ❤️

  </button>


  <button

    class="comment-react-btn"

    data-comment-id="${
      comment.id
    }"

  >

    😂

  </button>


  <button

    class="comment-react-btn"

    data-comment-id="${
      comment.id
    }"

  >

    😮

  </button>


  <button

    class="comment-react-btn"

    data-comment-id="${
      comment.id
    }"

  >

    🔥

  </button>

</div>


                <!-- REPLY BUTTON -->

                <button

                  class="reply-btn"

                  data-comment-id="${
                    comment.id
                  }"

                >

                  Reply

                </button>


                <!-- REPLY INPUT -->

                <div

                  class="reply-input-box"

                  id="reply-box-${
                    comment.id
                  }"

                >


                  <input

                    type="text"

                    class="reply-input"

                    placeholder="Write reply..."

                  />


                  <button

                    class="send-reply"

                    data-comment-id="${
                      comment.id
                    }"

                  >

                    Send

                  </button>

                </div>


                <!-- REPLIES -->

                <div class="reply-list">

                  ${
                    comment.replies

                    ?.map(reply => `

                      <div class="reply-item">


                        <img

                          class="reply-avatar"

                          src="${
                            reply.avatar
                            ||
                            "https://placehold.co/100"
                          }"

                        />


                        <div class="reply-body">

                          <strong>

                            ${
                              reply.username
                            }

                          </strong>


                          <p>

                            ${
                              reply.content
                            }

                          </p>

                        </div>

                      </div>

                    `)

                    .join("")
                  }

                </div>

              </div>

            </div>

          `).join("")
        }

      </div>


      <!-- INPUT -->

      <div class="comment-input-area">


        <input

          type="text"

          class="comment-input"

          placeholder="Write comment..."

        />


        <button
          class="send-comment"
        >

          Send

        </button>

      </div>

    </div>

  `;


  // APPEND

  document.body.appendChild(
    sheet
  );


  // REALTIME COMMENTS

  startRealtimeComments({

    postId,

    onNewComment: () => {

      openCommentSheet({

        postId,

        postOwnerUid

      });

    }

  });


  // CLOSE

  sheet

    .querySelector(
      ".close-comments"
    )

    .addEventListener(

      "click",

      () => {

        sheet.remove();

      }

    );



// COMMENT REACTIONS

const commentReactionButtons =

  sheet.querySelectorAll(
    ".comment-react-btn"
  );


commentReactionButtons.forEach(btn => {

  btn.addEventListener(

    "click",

    async () => {

      const commentId =

        btn.dataset.commentId;


      const reactionType =

        btn.innerText;


      const reactionMap = {

        "❤️":"love",

        "😂":"haha",

        "😮":"wow",

        "🔥":"fire"

      };


      const result =

        await reactToComment({

          commentId,

          reactionType:
            reactionMap[
              reactionType
            ]

        });


      console.log(result);


      // SIMPLE ANIMATION

      btn.classList.add(
        "active"
      );


      setTimeout(() => {

        btn.classList.remove(
          "active"
        );

      },300);

    }

  );

});



  // REPLY BUTTONS

  const replyButtons =

    sheet.querySelectorAll(
      ".reply-btn"
    );


  replyButtons.forEach(btn => {

    btn.addEventListener(

      "click",

      () => {

        const commentId =

          btn.dataset.commentId;


        const replyBox =

          document.getElementById(

            `reply-box-${commentId}`

          );


        replyBox.classList.toggle(
          "active"
        );

      }

    );

  });


  // SEND REPLY

  const sendReplyButtons =

    sheet.querySelectorAll(
      ".send-reply"
    );


  sendReplyButtons.forEach(btn => {

    btn.addEventListener(

      "click",

      async () => {

        const commentId =

          btn.dataset.commentId;


        const replyBox =

          document.getElementById(

            `reply-box-${commentId}`

          );


        const input =

          replyBox.querySelector(
            ".reply-input"
          );


        const text =
          input.value.trim();


        if(!text){

          return;

        }


        const success =

          await replyToComment({

            postId,

            parentCommentId:
              commentId,

            text

          });


        if(success){


          // REPLY NOTIFICATION

          const currentUser =
            getCurrentUser();


          if(

            currentUser
            &&
            postOwnerUid
            &&
            currentUser.uid !==
            postOwnerUid

          ){

            await createNotification({

              receiverUid:
                postOwnerUid,

              senderUid:
                currentUser.uid,

              senderName:
                currentUser.displayName,

              senderAvatar:
                currentUser.photoURL,

              type:
                "reply",

              postId,

              message:
                "replied to a comment 💬"

            });

          }


          openCommentSheet({

            postId,

            postOwnerUid

          });

        }

      }

    );

  });


  // SEND COMMENT

  const sendBtn =

    sheet.querySelector(
      ".send-comment"
    );


  const input =

    sheet.querySelector(
      ".comment-input"
    );


  sendBtn.addEventListener(

    "click",

    async () => {

      const text =
        input.value.trim();


      // EMPTY BLOCK

      if(!text){

        return;

      }


      // DISABLE BUTTON

      sendBtn.disabled = true;

      sendBtn.innerText =
        "...";


      // ADD COMMENT

      const success =

        await addComment({

          postId,

          text

        });


      // ENABLE BUTTON

      sendBtn.disabled = false;

      sendBtn.innerText =
        "Send";


      // SUCCESS

      if(success){


        // COMMENT NOTIFICATION

        const currentUser =
          getCurrentUser();


        if(

          currentUser
          &&
          postOwnerUid
          &&
          currentUser.uid !==
          postOwnerUid

        ){

          await createNotification({

            receiverUid:
              postOwnerUid,

            senderUid:
              currentUser.uid,

            senderName:
              currentUser.displayName,

            senderAvatar:
              currentUser.photoURL,

            type:
              "comment",

            postId,

            message:
              "commented on your post 💬"

          });

        }


        // CLEAR INPUT

        input.value = "";


        // RELOAD

        openCommentSheet({

          postId,

          postOwnerUid

        });

      }

    }

  );

}