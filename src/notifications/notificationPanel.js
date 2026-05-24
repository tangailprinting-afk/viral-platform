import { loadNotifications }

from "./loadNotifications.js";

import { getCurrentUser }

from "../auth/session.js";


export async function openNotificationPanel(){

  // REMOVE OLD PANEL

  const oldPanel =

    document.getElementById(
      "notificationPanel"
    );

  if(oldPanel){

    oldPanel.remove();

  }


  // CURRENT USER

  const currentUser =
    getCurrentUser();


  if(!currentUser){

    alert("Login Required");

    return;

  }


  // LOAD DATA

  const notifications =

    await loadNotifications(

      currentUser.uid

    );


  // CREATE PANEL

  const panel =
    document.createElement("div");


  panel.id =
    "notificationPanel";


  panel.className =
    "notification-panel";


  panel.innerHTML = `

    <div class="notification-overlay"></div>


    <div class="notification-container">


      <!-- HEADER -->

      <div class="notification-header">

        <h3>

          🔔 Notifications

        </h3>


        <button
          class="close-notifications"
        >

          ✖

        </button>

      </div>


      <!-- LIST -->

      <div class="notification-list">

        ${
          notifications.map(item => `

            <div class="notification-item">


              <img

                class="notification-avatar"

                src="${
                  item.sender_avatar
                  ||
                  'https://placehold.co/100'
                }"

              />


              <div
                class="notification-content"
              >

                <strong>

                  ${
                    item.sender_name
                    ||
                    "Creator"
                  }

                </strong>


                <p>

                  ${
                    item.message
                    ||
                    ""
                  }

                </p>

              </div>

            </div>

          `).join("")
        }

      </div>

    </div>

  `;


  document.body.appendChild(
    panel
  );


  // CLOSE

  panel

    .querySelector(
      ".close-notifications"
    )

    .addEventListener(

      "click",

      () => {

        panel.remove();

      }

    );

}