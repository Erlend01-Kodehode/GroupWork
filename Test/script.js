const addWishButton = document.querySelector("#WishlistButtonAdd");
const wishListContainer = document.querySelector("#WishlistItemsContainer");

let wishes = []; // Arr for storing wishes
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
