let wishes = [];

function showSubmitWindow() {
  const modal = document.createElement("dialog");
  const inputField = document.createElement("input");
  const submitInput = document.createElement("button");
  const cancelInput = document.createElement("button");

  modal.classList.add("DialogueWindow");
  inputField.classList.add("InputClass");
  submitInput.classList.add("ButtonClass");
  cancelInput.classList.add("ButtonClass");

  inputField.placeholder = "Your Wish";
  submitInput.textContent = "Submit";
  cancelInput.textContent = "Cancel";

  modal.append(inputField, submitInput, cancelInput);
  document.body.append(modal);

  modal.showModal();
  cancelInput.addEventListener("click", () => {
    modal.close();
    cancelInput.removeEventListener("click", arguments.callee);
  });
}

showSubmitWindow();
