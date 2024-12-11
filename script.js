const addWishButton = document.querySelector("#WishlistButtonAdd");

let wishes = []; // Arr for storing wishes

// Open submit modal
addWishButton.addEventListener("click", () => {
  showSubmitWindow();
});

// Modal window where you input wishes
function showSubmitWindow() {
  const modal = document.createElement("dialog");
  const inputField = document.createElement("input");
  const submitInput = document.createElement("button");
  const cancelInput = document.createElement("button");

  // Classes
  modal.classList.add("DialogueWindow");
  inputField.classList.add("InputClass");
  submitInput.classList.add("Button");
  cancelInput.classList.add("Button");

  inputField.placeholder = "Your Wish";
  submitInput.textContent = "Submit";
  cancelInput.textContent = "Cancel";

  // Button hover effects
  submitInput.addEventListener("mouseover", () => {
    submitInput.style.backgroundColor = "#0056b3";
  });
  submitInput.addEventListener("mouseout", () => {
    submitInput.style.backgroundColor = "#007BFF";
  });

  cancelInput.addEventListener("mouseover", () => {
    cancelInput.style.backgroundColor = "#5a6268";
  });
  cancelInput.addEventListener("mouseout", () => {
    cancelInput.style.backgroundColor = "#6c757d";
  });

  // HTML Structure
  modal.append(inputField, submitInput, cancelInput);
  document.body.append(modal);

  // Render Modal
  modal.showModal();
  // Close Window
  cancelInput.addEventListener("click", () => {
    modal.close();
    cancelInput.removeEventListener("click", arguments.callee);
  });
}

// Force Event
// showSubmitWindow();
