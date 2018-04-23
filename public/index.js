let latestModified = 0;


function fetchImages() {
  fetch('/images')
    //fetch creates a Promise to return a response from the server at "/images"
    .then(res => res.json())
    //the first .then is creating a promise to return a js object after converting the response useing the json();
    .then(imagePaths => {
      // after the first .then finishes converting the above .then will execute 
      imagePaths.forEach(path => {
        
        const imgElement = document.createElement("img");
        //set timestamp
        //data for console 
        imgElement.src = path;
        document.getElementById("images")
          .appendChild(imgElement);
      });
    })
    update();
}
fetchImages();



// function updateV2() {
//   console.log("updating...");
  
//   fetch('/update')
//   //fetch creates a Promise to return a response from the server at "/images"
//   .then(res => res.json())
//   //the first .then is creating a promise to return a js object after converting the response useing the json();
//   .then(updated => {
//     // after the first .then finishes converting the above .then will execute 
//     console.log("updating...2")
//     console.log(updated);
    
//     updated.forEach(path => {
//       const imgElement = document.createElement("img");
//       //set timestamp
//       //data for console 
//       imgElement.src = path;
//       console.log("updating...3")
      
//       document.getElementById("images")
//       .appendChild(imgElement);
//     });
//   })
//   setTimeout(updateV2, 5000);
// }
function update() {
  const postRequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latestModified
    }),
  }
  fetch('/update', postRequestOptions)
    .then(res => res.json())
    .then(updatedState => {
      latestModified = updatedState.latestModified;
      updatedState.images.forEach(path => {
        const imgElement = document.createElement("img");
        //set timestamp
        //data for console 
        imgElement.src = path;
        console.log("updating...3")
        
        document.getElementById("images")
          .appendChild(imgElement);
      });
    })
    setTimeout(update, 5000);
}