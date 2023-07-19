const avatar = document.querySelector(".avatar");
const borderRadius = document.querySelector("#border-radius");
const borderWidth = document.querySelector("#border-width");
const borderColor = document.querySelector("#color-option");
const uploadFile = document.querySelector("#file-upload");
const imageSize = document.querySelector("#image-size");
const resetButton = document.querySelector(".btn-reset");

//Change border radius
function changeBorderRadius(element, avatar) {
  if (localStorage.getItem("avatarBorderRadius")) {
    const storedRadius = localStorage.getItem("avatarBorderRadius");
    element.value = storedRadius;
    avatar.style.borderRadius = `${storedRadius}px`;
  }

  element.addEventListener("input", (event) => {
    avatar.style.borderRadius = `${event.currentTarget.value}px`;
    localStorage.setItem("avatarBorderRadius", event.currentTarget.value);
    event.currentTarget.previousElementSibling.textContent = `Border Radius: ${event.currentTarget.value}px`;
  });
}

//Change border color
function changeBorderColor(element, avatar) {
  if (localStorage.getItem("avatarBorderColor")) {
    const storedColor = localStorage.getItem("avatarBorderColor");
    element.value = storedColor;
    avatar.style.border = `5px solid ${storedColor}`;
  }

  element.addEventListener("input", (event) => {
    avatar.style.border = `5px solid ${event.currentTarget.value}`;
    localStorage.setItem("avatarBorderColor", event.currentTarget.value);
    event.currentTarget.previousElementSibling.textContent = `Border Color: ${event.currentTarget.value}`;
  });
}

//Change border width
function changeBorderWidth(element, avatar) {
  element.addEventListener("input", (event) => {
    avatar.style.borderWidth = `${event.currentTarget.value}px`;
    event.currentTarget.previousElementSibling.textContent = `Border Width: ${event.currentTarget.value}px`;
  });
}

//example images
function imageButtons(buttons, avatar) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let imagePath = button.dataset.image;
      avatar.src = imagePath;
    });
  });
}

// file upload
function fileUpload(fileInput, avatar) {
  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        avatar.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  });
}

// image size
function changeImageSize(element, avatar) {
  if (localStorage.getItem("avatarImageSize")) {
    const storedSize = localStorage.getItem("avatarImageSize");
    element.value = storedSize;
    avatar.style.width = `${storedSize}px`;
  }
  element.addEventListener("input", (event) => {
    avatar.style.width = `${event.currentTarget.value}px`;
    localStorage.setItem("avatarImageSize", event.currentTarget.value);
    event.currentTarget.previousElementSibling.textContent = `Image Size: ${event.currentTarget.value}px`;
  });
}

// reset styles
function resetStyles(
  resetButton,
  borderRadius,
  borderColor,
  borderWidth,
  imageSize,
  avatar
) {
  resetButton.addEventListener("click", (event) => {
    avatar.style.borderRadius = `0px`;
    avatar.style.border = ``;
    avatar.style.width = `250px`;

    borderRadius.value = 50;
    borderRadius.previousElementSibling.textContent = "Adjust border radius:";
    borderColor.value = `none`;
    borderColor.previousElementSibling.textContent = "Choose border color:";
    imageSize.previousElementSibling.textContent = "Change image size:";
    borderWidth.value = 5;
    borderWidth.previousElementSibling.textContent = "Adjust border width:";
  });
}

changeBorderRadius(borderRadius, avatar);
changeBorderColor(borderColor, avatar);
imageButtons(document.querySelectorAll(".btn"), avatar);
fileUpload(uploadFile, avatar);
changeImageSize(imageSize, avatar);
resetStyles(
  resetButton,
  borderRadius,
  borderColor,
  borderWidth,
  imageSize,
  avatar
);
changeBorderWidth(borderWidth, avatar);
