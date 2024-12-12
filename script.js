const addWishButton = document.querySelector("#WishlistButtonAdd");

let wishes = JSON.parse(localStorage.getItem("Wishes")) || []; // Load saved wishes or initialize an empty array

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
