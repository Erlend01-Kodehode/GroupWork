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
    window.removeEventListener("click", arguments.callee);
  });
}

showCompleted.addEventListener("change", () => {
  renderList(tasks);
});

sortBy.addEventListener("change", () => {
  renderList(tasks);
});

function renderList(taskArr) {
  // Clear local storage if task arr is empty
  if (taskArr.length === 0) {
    localStorage.removeItem("Tasks");
    localStorage.removeItem("ShowCompleted");
    localStorage.removeItem("SortBy");
  }
  buildList(filterAndSort(taskArr));
  saveStateToLocalStorage();
}

function filterAndSort(arr) {
  return arr
    .filter((e) => (!showCompleted.checked ? !e.completed : e))
    .sort((a, b) => {
      if (sortBy.value === "TimeAsc") {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      } else if (sortBy.value === "TimeDesc") {
        return new Date(b.timeStamp) - new Date(a.timeStamp);
      } else if (sortBy.value === "AlphaAsc") {
        return b.description.localeCompare(a.description);
      } else if (sortBy.value === "AlphaDesc") {
        return a.description.localeCompare(b.description);
      }
    });
}

// Construct List Array
function buildList(taskArr) {
  // Empty List
  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }
  // Create Elements
  taskArr.forEach((task, i) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("TaskContainer");
    // Create Timestamp
    const timeStampElem = document.createElement("p");
    timeStampElem.classList.add("Timestamp");
    timeStampElem.textContent = task.timeStamp;
    // Create Description
    const descriptionElem = document.createElement("input");
    descriptionElem.classList.add("Description");
    descriptionElem.value = task.description;
    descriptionElem.readOnly = true;
    // Add Complete Checkmark
    const completedElem = document.createElement("input");
    completedElem.type = "checkbox";
    completedElem.checked = task.completed;
    if (task.completed) {
      taskContainer.classList.add("Completed");
    }
    // Update Tasks Array and Change CSS Class
    completedElem.addEventListener("change", () => {
      tasks[i].completed = completedElem.checked;
      saveStateToLocalStorage();
      if (task.completed) {
        taskContainer.classList.add("Completed");
      } else {
        taskContainer.classList.remove("Completed");
      }
    });
    // Add Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("EditButton");
    editButton.addEventListener("click", () => {
      tasks[i].description = descriptionElem.value;
      saveStateToLocalStorage();
      descriptionElem.readOnly = !descriptionElem.readOnly;
      editButton.textContent = descriptionElem.readOnly ? "Edit" : "Save";
      if (!descriptionElem.readOnly) descriptionElem.focus();
    });
    // Add Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("DeleteButton");
    // Doesn't work quite right
    deleteButton.addEventListener("click", () => {
      if (tasks.length === 1) {
        console.log(tasks);
        tasks.pop();
        console.log(tasks);
      } else {
        console.log(tasks);
        tasks.splice(i, i);
        console.log(tasks);
      }
      renderList(tasks);
      saveStateToLocalStorage();
    });
    // Append
    taskContainer.append(
      timeStampElem,
      descriptionElem,
      completedElem,
      editButton,
      deleteButton
    );
    listContainer.prepend(taskContainer);
  });
}

// Save Data to Local Storage
function saveStateToLocalStorage() {
  // Serialize tasks arr to JSON before storing to local storage
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  // Store Bool value of showCompleted Check
  localStorage.setItem("ShowCompleted", showCompleted.checked);
  // Store the value of sortBy
  localStorage.setItem("SortBy", sortBy.value);
}
