const taskInput = document.querySelector("#task-input");
const taskForm = document.querySelector(".task-form");
const taskItems = document.querySelector(".task-items");
const emptyState = document.querySelector(".empty-state");
const taskError = document.querySelector("#task-error");

function updateEmptyState() {
  const hasTasks = taskItems.children.length > 0;
  emptyState.hidden = hasTasks;
  taskItems.hidden = !hasTasks;
}

function clearValidation() {
  taskError.textContent = "";
  taskError.hidden = true;
  taskInput.removeAttribute("aria-invalid");
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (!taskText) {
    taskError.textContent = "Please enter a task.";
    taskError.hidden = false;
    taskInput.setAttribute("aria-invalid", "true");
    taskInput.focus();
    return;
  }

  const task = document.createElement("li");
  task.textContent = taskText;
  taskItems.appendChild(task);
  updateEmptyState();
  clearValidation();
  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("input", clearValidation);

// Keep the placeholder in sync if the list is emptied programmatically.
new MutationObserver(updateEmptyState).observe(taskItems, { childList: true });
updateEmptyState();
