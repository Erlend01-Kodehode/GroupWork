const addWishButton = document.querySelector("#WishlistButtonAdd");
const wishListContainer = document.querySelector("#WishlistItemsContainer");

let wishes = []; // Arr for storing wishes

const storedTasks = localStorage.getItem("Wishes");
if (storedTasks) {
  wishes = JSON.parse(storedTasks);
  buildWishList(wishes);
}

function renderList(wishArr) {
  // Clear local storage if task arr is empty
  if (wishArr.length === 0) {
    localStorage.removeItem("Wishes");
  }
  buildWishList(wishArr);
}
// Open submit modal
addWishButton.addEventListener("click", () => {
  showSubmitWindow();
});

// Modal window where you input wishes
function showSubmitWindow() {
  const modal = document.createElement("dialog");
  const inputForm = document.createElement("form");
  const inputField = document.createElement("input");
  const modalButtonsDiv = document.createElement("div");
  const submitInput = document.createElement("button");
  const cancelInput = document.createElement("button");

  // Classes
  modal.classList.add("DialogueWindow");
  inputForm.classList.add("FormClass");
  inputField.classList.add("InputClass");
  modalButtonsDiv.classList.add("SubmitFieldButtonsDiv");
  submitInput.classList.add("Button");
  submitInput.classList.add("ButtonSubmit");
  cancelInput.classList.add("Button");
  cancelInput.classList.add("ButtonCancel");

  inputField.placeholder = "Your Wish";
  inputField.name = "InputField";
  submitInput.textContent = "Submit";
  cancelInput.textContent = "Cancel";

  // HTML Structure
  inputForm.append(inputField);
  modalButtonsDiv.append(submitInput, cancelInput);
  modal.append(inputForm, modalButtonsDiv);
  document.body.append(modal);

  // Render Modal
  modal.showModal();

  // Submit Form
  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(inputForm); // Save Form Data
    // Error if empty
    if (!formData.get("InputField")) {
      console.error("The wish input field is empty.");
      return;
    }
    // Push to array
    wishes.push({
      description: formData.get("InputField"),
    });
    // Close Modal
    modal.close();
    inputForm.removeEventListener("submit", arguments.callee);
    submitInput.removeEventListener("click", arguments.callee);
    console.log(wishes);
    buildWishList(wishes);
  });
  submitInput.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(inputForm); // Save Form Data
    // Error if empty
    if (!formData.get("InputField")) {
      console.error("The wish input field is empty.");
      return;
    }
    // Push to array
    wishes.push({
      description: formData.get("InputField"),
    });
    // Close Modal
    modal.close();
    inputForm.removeEventListener("submit", arguments.callee);
    submitInput.removeEventListener("click", arguments.callee);
    console.log(wishes);
    buildWishList(wishes);
  });
  // Cancel and close Modal
  cancelInput.addEventListener("click", () => {
    modal.close();
    cancelInput.removeEventListener("click", arguments.callee);
  });
  // Backup cleanup
  window.addEventListener("keydown", (e) => {
    if (e == "Escape") {
      modal.close();
      inputForm.removeEventListener("submit", arguments.callee);
      cancelInput.removeEventListener("click", arguments.callee);
    }
  });
}

function buildWishList(wishArr) {
  // Empty List
  while (wishListContainer.firstChild) {
    wishListContainer.firstChild.remove();
  }
  // Create Elements
  wishArr.forEach((wish, i) => {
    const wishContainer = document.createElement("div");
    wishContainer.classList.add("WishlistItem");
    // Create Priority Buttons Div
    const priorityDiv = document.createElement("div");
    // Create Priority Buttons
    const priorityButtonUp = document.createElement("button");
    const priorityButtonDown = document.createElement("button");
    priorityButtonUp.classList.add("MoveButton");
    priorityButtonDown.classList.add("MoveButton");
    priorityButtonUp.addEventListener("click", () => {
      arrayMove(wishes, i, i - 1);
    });
    priorityButtonDown.addEventListener("click", () => {
      arrayMove(wishes, i, i + 1);
    });
    // Create Priority Images
    const priorityButtonUpImg = document.createElement("img");
    const priorityButtonDownImg = document.createElement("img");
    priorityButtonUpImg.src = "./Images/move-up.png";
    priorityButtonDownImg.src = "./Images/move-down.png";
    // Create Numbering
    const wishNumber = document.createElement("p");
    wishNumber.classList.add("WishNumber");
    wishNumber.textContent = i + 1;
    // Create Text Field
    const wishField = document.createElement("input");
    wishField.classList.add("TextField");
    wishField.type = "Text";
    wishField.value = wish.description;
    wishField.readOnly = true;
    // Create Edit / Delete Div
    const wishEditDeleteDiv = document.createElement("div");
    wishEditDeleteDiv.classList.add("EditDeleteButtons");
    // Create Edit Button
    const wishEditButton = document.createElement("button");
    wishEditButton.classList.add("Button");
    wishEditButton.classList.add("ButtonEdit");
    wishEditButton.textContent = "Edit";
    wishEditButton.addEventListener("click", () => {
      wishes[i].description = wishField.value;
      saveStateToLocalStorage();
      wishField.readOnly = !wishField.readOnly;
      wishEditButton.textContent = wishField.readOnly ? "Edit" : "Save";
      if (!wishField.readOnly) wishField.focus();
    });
    // Create Delete Button
    const wishDeleteButton = document.createElement("button");
    wishDeleteButton.classList.add("Button");
    wishDeleteButton.classList.add("ButtonDelete");
    wishDeleteButton.textContent = "Delete";
    // Doesn't work quite right
    wishDeleteButton.addEventListener("click", () => {
      if (wishes.length === 1) {
        wishes.pop();
      } else {
        wishes.splice(i, 1);
      }
      renderList(wishes);
      saveStateToLocalStorage();
    });

    // Append
    wishListContainer.append(wishContainer);
    wishContainer.append(priorityDiv, wishNumber, wishField, wishEditDeleteDiv);
    wishEditDeleteDiv.append(wishEditButton, wishDeleteButton);
    priorityDiv.append(priorityButtonUp, priorityButtonDown);
    priorityButtonUp.append(priorityButtonUpImg);
    priorityButtonDown.append(priorityButtonDownImg);
    saveStateToLocalStorage();
  });
}

// Hooked into the Up and Down buttons
function arrayMove(wishes, oldPosition, newPosition) {
  wishes.splice(newPosition, 0, wishes.splice(oldPosition, 1)[0]);
  renderList(wishes);
  saveStateToLocalStorage();
}

// const editBtn = document.getElementById("ButtonEdit");
// editBtn.addEventListener("click", editButton);

// function editButton() {
//   const wishItem = document.getElementById("TextField");

//   if (editBtn.textContent === "Edit") {
//     // Enable editing
//     wishItem.contentEditable = "true";
//     wishItem.focus();
//     editBtn.textContent = "Save";
//   } else {
//     // Save changes
//     wishItem.contentEditable = "false";
//     editBtn.textContent = "Edit";

//     // Update the `wishes` array with the new content
//     const updatedWish = wishItem.textContent;
//     wishes[0] = updatedWish; // Assuming a single wish; expand for multiple items as needed
//     saveStateToLocalStorage();
//   }
// }

// Force Event
// showSubmitWindow();

// Save Data to Local Storage
function saveStateToLocalStorage() {
  // Serialize wishes arr to JSON before storing to local storage
  localStorage.setItem("Wishes", JSON.stringify(wishes));
}

// Load and display the saved wish on page load
// document.addEventListener("DOMContentLoaded", () => {
//   const wishItem = document.getElementById("TextField");
//   if (wishes.length > 0) {
//     wishItem.textContent = wishes[0]; // Load the first wish; adapt for multiple items as needed
//   }
// });

// function playRR(rick_astley_audio) {
//   let sound = document.getElementById(rick_astley_audio);
//   sound.play();
// }

const funnyButton = document.querySelector("#FunnyButton");

funnyButton.addEventListener("click", () => {
  new Audio("./audio/rick_astley.mp3").play();
});
