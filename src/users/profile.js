export function openProfile({

  user

}){

  // REMOVE OLD MODAL

  const oldModal =

    document.getElementById(
      "profileModal"
    );

  if(oldModal){

    oldModal.remove();

  }


  // CREATE MODAL

  const modal =
    document.createElement("div");


  modal.id =
    "profileModal";


  modal.className =
    "profile-modal";


  modal.innerHTML = `

    <div class="profile-content">


      <!-- HERO -->

      <div class="profile-hero">


        <!-- CLOSE -->

        <button
          class="close-profile"
        >
          ✖
        </button>


        <!-- AVATAR -->

        <div
          class="profile-avatar-wrapper"
        >

          <img

            class="profile-avatar"

            src="${
              user.avatar
              ||
              'https://placehold.co/200'
            }"

          />


          <div
            class="verified-badge"
          >
            ✔
          </div>

        </div>

      </div>


      <!-- INFO -->

      <div class="profile-info">

        <h2 class="profile-name">

          ${
            user.username
            ||
            "Creator"
          }

        </h2>


        <div class="creator-level">

          🔥 Diamond Creator

        </div>


        <div class="creator-rank">

          #12 Trending In Bangladesh

        </div>

      </div>


      <!-- STATS -->

      <div class="profile-stats">


        <div class="stat-card">

          <strong>12.5K</strong>

          <span>Followers</span>

        </div>


        <div class="stat-card">

          <strong>8.2M</strong>

          <span>Views</span>

        </div>


        <div class="stat-card">

          <strong>92K</strong>

          <span>Coins</span>

        </div>


      </div>


      <!-- TABS -->

      <div class="profile-tabs">

        <button class="active">

          Posts

        </button>


        <button>

          Photos

        </button>


        <button>

          Trending

        </button>


        <button>

          Achievements

        </button>


        <button>

          Rewards

        </button>

      </div>


      <!-- POSTS -->

      <div class="profile-posts">


        <div class="post-card">

          <div class="post-content">

            🔥 Creator profile system ready

          </div>

        </div>


      </div>

    </div>

  `;


  document.body.appendChild(
    modal
  );


  // CLOSE

  modal

    .querySelector(
      ".close-profile"
    )

    .addEventListener(

      "click",

      () => {

        modal.remove();

      }

    );

}