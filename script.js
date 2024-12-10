let wishes = []; // Arr for storing wishes

// Modal window where you input wishes
function showSubmitWindow() {
  const modal = document.createElement("dialog");
  const inputField = document.createElement("input");
  const submitInput = document.createElement("button");
  const cancelInput = document.createElement("button");

  // Classes
  modal.classList.add("DialogueWindow");
  inputField.classList.add("InputClass");
  submitInput.classList.add("ButtonClass");
  cancelInput.classList.add("ButtonClass");

  inputField.placeholder = "Your Wish";
  submitInput.textContent = "Submit";
  cancelInput.textContent = "Cancel";

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

// showSubmitWindow();
