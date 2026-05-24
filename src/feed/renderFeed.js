export function renderFeed({

  posts,

  container

}){

  container.innerHTML = "";

  posts.forEach(post => {

    container.innerHTML += `

      <div class="post-card">

        <div class="post-top">

          <div class="avatar"></div>

          <div class="post-user">

            <h3>
              বাংলা Creator
            </h3>

            <span>
              Live
            </span>

          </div>

        </div>


        <div class="post-content">

          ${post.content || ""}

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

      </div>

    `;

  });

}