// Retrieve tasks from LocalStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

// Render tasks when the page loads
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();

    // Enable adding task by pressing Enter key
    const taskInput = document.getElementById("taskInput");
    taskInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

// Function to render the list of tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    const pendingText = document.getElementById("pendingText");
    const clearAllBtn = document.getElementById("clearAllBtn");

    // Clear current list content
    taskList.innerHTML = "";

    // Populate task list
    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Task text container
        const spanText = document.createElement("span");
        spanText.className = "task-text";
        spanText.textContent = task;
        li.appendChild(spanText);

        // Delete button (styled red background, white trash can icon)
        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteBtn";
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.setAttribute("aria-label", "Delete task");
        deleteButton.onclick = () => deleteTask(index);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    // Update pending tasks counter
    const count = tasks.length;
    pendingText.textContent = `You have ${count} pending task${count !== 1 ? 's' : ''}`;

    // Enable/disable Clear All button depending on task count
    if (count > 0) {
        clearAllBtn.style.opacity = "1";
        clearAllBtn.style.pointerEvents = "auto";
    } else {
        clearAllBtn.style.opacity = "0.6";
        clearAllBtn.style.pointerEvents = "none";
    }
}

// Function to add a new task
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        input.focus();
        return;
    }

    // Add to array, save to localStorage, and render
    tasks.push(taskText);
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
    renderTasks();

    // Reset input field and refocus
    input.value = "";
    input.focus();
}

// Function to delete a specific task by index
function deleteTask(index) {
    // Optional slide-out animation can be added here
    tasks.splice(index, 1);
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
    renderTasks();
}

// Function to clear all tasks
function clearAllTasks() {
    if (tasks.length === 0) return;
    
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        localStorage.setItem("todoTasks", JSON.stringify(tasks));
        renderTasks();
    }
}