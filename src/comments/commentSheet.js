import { addComment }

from "./addComment.js";

import { loadComments }

from "./loadComments.js";


export async function openCommentSheet({

  postId

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


              <img

                class="comment-avatar"

                src="${
                  comment.avatar
                  ||
                  'https://placehold.co/100'
                }"

              />


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


  document.body.appendChild(
    sheet
  );


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
        input.value;


      const success =

        await addComment({

          postId,

          text

        });


      if(success){

        openCommentSheet({

          postId

        });

      }

    }

  );

}