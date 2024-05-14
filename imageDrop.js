const dropArea = document.getElementById("drag-area");
const displayArea = document.getElementById("display-area");
const dragText = document.querySelector(".header");
const removeButton = document.getElementById("removeImage");


let button = document.querySelector("#browseButton");
let input = document.querySelector("#fileUpload");
let graphButton = document.getElementById("graphButton");
let file;
var fullContours; //global var to store full contours array


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
  loadDesmos(fullContours);
  DesmosCalculator.style.display = "flex";
  document.querySelector(".page").style.display = "none";
})


//When remove image button is clicked
removeButton.addEventListener("click", ()=>{
  displayArea.classList.add('hidden');
  dropArea.classList.remove('hidden');
  removeButton.classList.add('hidden');
  document.getElementById("graphButton").classList.add('disable');
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
        dropArea.classList.add("hidden"); //hide the drop area
        // Get the image element
        let img = document.getElementById("imgDisplay");
        img.src = fileURL;

        // Add onload event listener to the image
        img.onload = function() {
          displayArea.classList.remove('hidden'); //show the display image
          removeButton.classList.remove('hidden'); //show the buttons
          document.getElementById("graphButton").classList.remove('disable');
          fullContours = getContours("imgDisplay"); //full arrays of contours points
        };
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("This is not an Image File");
      dropArea.classList.remove("active");
    }
  }