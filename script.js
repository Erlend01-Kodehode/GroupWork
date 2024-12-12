const addWishButton = document.querySelector("#WishlistButtonAdd");
const wishListContainer = document.querySelector("#WishlistItemsContainer");

let wishes = [];
console.log(wishes);

// Open submit modal
addWishButton.addEventListener("click", () => {
  showSubmitWindow();
});

// Modal window where you input wishes
function showSubmitWindow() {
  const modal = document.createElement("dialog");
  const inputForm = document.createElement("form");
  const inputField = document.createElement("input");
  const submitInput = document.createElement("button");
  const cancelInput = document.createElement("button");

  // Classes
  modal.classList.add("DialogueWindow");
  inputForm.classList.add("FormClass");
  inputField.classList.add("InputClass");
  submitInput.classList.add("Button");
  submitInput.classList.add("SubmitButton");
  cancelInput.classList.add("Button");
  cancelInput.classList.add("CancelButton");

  inputField.placeholder = "Your Wish";
  inputField.name = "InputField";
  submitInput.textContent = "Submit";
  cancelInput.textContent = "Cancel";

  // HTML Structure
  inputForm.append(inputField, submitInput);
  modal.append(inputForm, cancelInput);
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
    // Create Priority Images
    const priorityButtonUpImg = document.createElement("img");
    const priorityButtonDownImg = document.createElement("img");
    // ImageHere
    // ImageHere
    // Create Numbering
    const wishNumber = document.createElement("p");
    wishNumber.classList.add("WishNumber");
    wishNumber.textContent = i;
    // Create Text Field
    const wishField = document.createElement("input");
    wishField.classList.add("TextField");
    wishField.value = wish.description;
    wishField.readOnly = true;
    // Create Edit Button
    const wishEditButton = document.createElement("button");
    wishEditButton.classList.add("EditButton");
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
    wishDeleteButton.classList.add("DeleteButton");
    wishDeleteButton.textContent = "Delete";
    // Append
    wishListContainer.prepend(wishContainer);
    wishContainer.append(
      priorityDiv,
      wishNumber,
      wishField,
      wishEditButton,
      wishDeleteButton
    );
    priorityDiv.append(priorityButtonUp, priorityButtonDown);
    priorityButtonUp.append(priorityButtonUpImg);
    priorityButtonDown.append(priorityButtonDownImg);
  });
}

const editBtn = document.getElementById("ButtonEdit");
editBtn.addEventListener("click", editButton);

function editButton() {
  const wishItem = document.getElementById("TextField");

  if (editBtn.textContent === "Edit") {
    // Enable editing
    wishItem.contentEditable = "true";
    wishItem.focus();
    editBtn.textContent = "Save";
  } else {
    // Save changes
    wishItem.contentEditable = "false";
    editBtn.textContent = "Edit";

    // Update the `wishes` array with the new content
    const updatedWish = wishItem.textContent;
    wishes[0] = updatedWish; // Assuming a single wish; expand for multiple items as needed
    saveStateToLocalStorage();
  }
}

// Force Event
// showSubmitWindow();

// Save Data to Local Storage
function saveStateToLocalStorage() {
  // Serialize wishes arr to JSON before storing to local storage
  localStorage.setItem("Wishes", JSON.stringify(wishes));
}

// Load and display the saved wish on page load
document.addEventListener("DOMContentLoaded", () => {
  const wishItem = document.getElementById("TextField");
  if (wishes.length > 0) {
    wishItem.textContent = wishes[0]; // Load the first wish; adapt for multiple items as needed
  }
});
