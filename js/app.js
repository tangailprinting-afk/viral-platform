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


// CREATE POST

postBtn.addEventListener(
  "click",
  async () => {

    const text =
      postInput.value.trim();

    if(!text){
      alert("কিছু লিখুন");
      return;
    }

    const { error } =
      await client
      .from("posts")
      .insert([
        {
          content:text
        }
      ]);

    if(error){
      console.log(error);
      alert("Post Failed");
      return;
    }

    postInput.value = "";

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
          ${post.content}
        </div>

      </div>

    `;

  });

}


loadPosts();