const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");


let button = document.querySelector("#browseButton");
let input = document.querySelector("#fileUpload");
let graphButton = document.getElementById("graphButton");
let file;


button.onclick = () => {
    input.click();
};

// when browse
input.addEventListener("change", function () {
    file = this.files[0];
    dropArea.classList.add("active");
    displayFile();
});


// when file is inside drag area
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload";
    // console.log('File is inside the drag area');
});


  // when file leave the drag area
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    // console.log('File left the drag area');
    dragText.textContent = "Drag & Drop";
});


// when file is dropped
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    // console.log('File is dropped in drag area');
    file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
    // console.log(file);
    displayFile();
  });


// When graph button is clicked
graphButton.addEventListener("click", () => {

})


  function displayFile() {
    let fileType = file.type;
    // console.log(fileType);
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
      // console.log('This is an image file');
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        // console.log(fileURL);
        let imgTag = `<img src="${fileURL}" id="imgDisplay" alt="">`;
        dropArea.innerHTML = imgTag;
        // Get the image element
        let img = document.getElementById("imgDisplay");

        // Add onload event listener to the image
        img.onload = function() {
          var fullContours = getContours("imgDisplay"); //full arrays of contours points
        };
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("This is not an Image File");
      dropArea.classList.remove("active");
    }
  }