const taskForm = document.querySelector("#TaskForm");
const taskInput = document.querySelector("#UserInput");
const listContainer = document.querySelector("#ListContainer");
const showCompleted = document.querySelector("#ShowCompleted");
const sortBy = document.querySelector("#SortBy");

let tasks = [];

// Load Data from Local Storage
showCompleted.checked = localStorage.getItem("ShowCompleted") === "true";
sortBy.value = localStorage.getItem("SortBy");
const storedTasks = localStorage.getItem("Tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  buildList(tasks);
}

// Submit Data
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent Refresh
  const formData = new FormData(taskForm); // Save Form Data
  // Trigger Error if task is empty
  if (!formData.get("UserInput")) {
    showError("You can't submit an empty task");
    return;
  }
  // Creates new task object and pushes to var
  tasks.push({
    timeStamp: new Date().toLocaleString("en-UK"),
    description: formData.get("UserInput"),
    completed: false,
  });
  buildList(tasks);
});

function showError(message) {
  const modal = document.createElement("dialog");

  const errorMsg = document.createElement("p");
  errorMsg.textContent = message;
  const closeModal = document.createElement("button");
  closeModal.textContent = "Understood";

  modal.append(errorMsg, closeModal);
  document.body.append(modal);

  modal.showModal();
  window.addEventListener("click", () => {
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
