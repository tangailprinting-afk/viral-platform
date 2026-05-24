export function openImageViewer(

  imageUrl

){

  // REMOVE OLD VIEWER

  const oldViewer =

    document.getElementById(
      "imageViewer"
    );

  if(oldViewer){

    oldViewer.remove();

  }


  // CREATE VIEWER

  const viewer =
    document.createElement("div");


  viewer.id =
    "imageViewer";


  viewer.className =
    "image-viewer";


  viewer.innerHTML = `

    <div class="viewer-backdrop">


      <!-- CLOSE -->

      <button
        class="close-viewer"
      >

        ✖

      </button>


      <!-- IMAGE -->

      <img

        class="viewer-image"

        src="${imageUrl}"

      />

    </div>

  `;


  document.body.appendChild(
    viewer
  );


  // CLOSE BUTTON

  viewer

    .querySelector(
      ".close-viewer"
    )

    .addEventListener(

      "click",

      () => {

        viewer.remove();

      }

    );


  // CLICK OUTSIDE CLOSE

  viewer.addEventListener(

    "click",

    e => {

      if(

        e.target.classList.contains(
          "viewer-backdrop"
        )

      ){

        viewer.remove();

      }

    }

  );

}