console.log("APP START");

const SUPABASE_URL =
  "https://thqfdwxfcmryrzrvhzni.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocWZkd3hmY21yeXJ6cnZoem5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDMwODYsImV4cCI6MjA5NTE3OTA4Nn0.vi8o4xmRV2J-VKwCFPvL6BGQAYuosXAST3oZ_SHyoGM";

const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const postBtn =
  document.getElementById("postBtn");

const postInput =
  document.getElementById("postInput");

const feed =
  document.getElementById("feed");
const imageInput =
  document.getElementById(
    "imageInput"
  );

// CREATE POST

postBtn.addEventListener(
  "click",
  async () => {

    const text =
      postInput.value.trim();

    const file =
      imageInput.files[0];

    if(!text && !file){

      alert("কিছু লিখুন");

      return;

    }

    let imageUrl = "";


    // IMAGE UPLOAD

    if(file){

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        "viral_posts"
      );

      const response =
        await fetch(
          "https://api.cloudinary.com/v1_1/dkrsjdmr9/image/upload",
          {
            method:"POST",
            body:formData
          }
        );

      const data =
        await response.json();

      imageUrl =
        data.secure_url;

    }


    // SAVE POST

    const { error } =
      await client
      .from("posts")
      .insert([
        {
          content:text,
          image_url:imageUrl
        }
      ]);

    if(error){

      console.log(error);

      alert("Post Failed");

      return;

    }

    postInput.value = "";

    imageInput.value = "";

    loadPosts();

  }
);


// LOAD POSTS

async function loadPosts(){

  const { data,error } =
    await client
    .from("posts")
    .select("*")
    .order(
      "created_at",
      { ascending:false }
    );

  if(error){
    console.log(error);
    return;
  }

  renderPosts(data);

}


// RENDER POSTS

function renderPosts(posts){

  feed.innerHTML = "";

  posts.forEach(post => {

    feed.innerHTML += `

      <div class="post-card">

        <div class="post-top">

          <div class="avatar"></div>

          <div class="post-user">
            <h3>বাংলা Creator</h3>
            <span>Live</span>
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

        <div class="post-actions">

          <button
            onclick="likePost(${post.id}, this)"
          >
            ❤️ ${post.likes_count}
          </button>

        </div>

        <div class="comment-box">

          <input
            id="comment-input-${post.id}"
            type="text"
            placeholder="কমেন্ট লিখুন..."
          />

          <button
            onclick="addComment(${post.id})"
          >
            পাঠান
          </button>

        </div>

      </div>

    `;

  });

}


















loadPosts();

async function likePost(id,btn){

  // INSTANT UI UPDATE

  let current =
    parseInt(
      btn.innerText.replace(/\D/g,'')
    );

  current++;

  btn.innerHTML =
    `❤️ ${current}`;


  // DATABASE UPDATE

  const { data } =
    await client
    .from("posts")
    .select("likes_count")
    .eq("id",id)
    .single();

  let likes =
    data.likes_count + 1;

  await client
    .from("posts")
    .update({
      likes_count:likes
    })
    .eq("id",id);

}
async function addComment(postId){

  const input =
    document.getElementById(
      `comment-input-${postId}`
    );

  const text =
    input.value.trim();

  if(!text) return;

  const { error } =
    await client
    .from("comments")
    .insert([
      {
        post_id:postId,
        comment:text
      }
    ]);

  if(error){
    console.log(error);
    return;
  }

  input.value = "";

  alert("কমেন্ট হয়েছে 🔥");

}
client
.channel("posts-channel")

.on(
  "postgres_changes",
  {
    event:"INSERT",
    schema:"public",
    table:"posts"
  },

  payload => {

    console.log(
      "NEW POST",
      payload
    );

    loadPosts();

  }

)

.subscribe();
const channel = client
.channel("realtime-posts")

.on(
  "postgres_changes",
  {
    event:"INSERT",
    schema:"public",
    table:"posts"
  },

  payload => {

    console.log(
      "Realtime New Post",
      payload
    );

    loadPosts();

  }

)

.subscribe();