// Display the current date in the header
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const dayDate = new Date().toLocaleDateString('en-US', options);
document.getElementById("day").innerHTML = dayDate;

// Initialize tasks from localStorage when the page loads
window.onload = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addToDom(task.text, task.completed, task.category, task.details));
};

// Save a task to localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update a task's completion status in localStorage
function updateTaskInLocalStorage(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.text === text) task.completed = completed;
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove a task from localStorage
function removeFromLocalStorage(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a task to the DOM
function addToDom(text, completed, category, details) {
    // Create task container
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

    const tasksHome = document.createElement("div");
    tasksHome.classList.add("tasksHome");

    const taskText = document.createElement("p");
    taskText.classList.add("taskText");
    taskText.textContent = text;

    // Style completed tasks
    if (completed) {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "#aeaeae";
    }

    // Add checkbox for marking tasks as complete
    const check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("check");
    check.checked = completed;

     // Toggle task completion
     check.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the taskContainer
        taskText.style.textDecoration = check.checked ? "line-through" : "none";
        taskText.style.color = check.checked ? "#aeaeae" : "black";
        updateTaskInLocalStorage(text, check.checked);
    });

    // Add a button to remove the task
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener('click', () => {
        taskContainer.remove();
        removeFromLocalStorage(text);
    });

    // Append elements to the task container
    tasksHome.append(check, taskText, removeBtn);
    taskContainer.append(tasksHome);

    // Toggle and display task details
    taskContainer.addEventListener('click', () => {
        const existingDetails = taskContainer.querySelector(".taskDetails");
        if (existingDetails) {
            existingDetails.remove();
        } else {
            const taskDetails = document.createElement("div");
            taskDetails.classList.add("taskDetails");

            const timeSelected = document.createElement("p");
            const dateSelected = document.createElement("p");
            const descriptionAdded = document.createElement("p");

            timeSelected.textContent = `Time: ${details.time || "Not specified"}`;
            dateSelected.textContent = `Date: ${details.date || "Not specified"}`;
            descriptionAdded.textContent = `Description: ${details.description || "No description"}`;

            taskDetails.append(timeSelected, dateSelected, descriptionAdded);
            taskContainer.appendChild(taskDetails);
        }
    });

    // Append the task to the appropriate category container
    if (category === "Personal") {
        document.getElementById("divs2").appendChild(taskContainer);
    } else {
        document.getElementById("taskContent").appendChild(taskContainer);
    }
}

// Toggle visibility between Personal and Work tasks
document.getElementById("personal").addEventListener('click', () => {
    document.getElementById("divs2").classList.add("show");
    document.getElementById("divs2").classList.remove("hidden");
    document.getElementById("taskContent").classList.add("hidden");
    document.getElementById("taskContent").classList.remove("show");
});

document.getElementById("work").addEventListener('click', () => {
    document.getElementById("taskContent").classList.add("show");
    document.getElementById("taskContent").classList.remove("hidden");
    document.getElementById("divs2").classList.add("hidden");
    document.getElementById("divs2").classList.remove("show");
});

// Add a new task
document.getElementById("addTask").addEventListener('click', () => {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("mainDiv");

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");

    // Task input fields
    taskDiv.innerHTML = `
        <h2 class="firstTask" style="text-align: center; font-weight: bold; padding: 1em;">New Task</h2>
        <p class="taskText">Task Title</p>
        <input class="inputTask" type="text" placeholder="Add Task Name">
        <p class="categoryText">Category</p>
        <div class="category">
            <button class="personal">Personal</button>
            <button class="work">Work</button>
        </div>
        <p class="categoryText">Description</p>
        <textarea class="description" rows="4" cols="30" placeholder="Add Description (Optional)"></textarea>
        <div class="timeDiv">
            <div>
                <p>Date</p>
                <input class="taskDate" type="date">
            </div>
            <div>
                <p>Time</p>
                <input class="taskTime" type="time">
            </div>
        </div>
        <div class="category">
            <button class="personal" id="cancel">Cancel</button>
            <button class="work" id="create">Create</button>
        </div>
    `;

    mainDiv.appendChild(taskDiv);
    document.getElementById("divs").appendChild(mainDiv);

    // Category button styling
    const personalButton = taskDiv.querySelector(".personal");
    const workButton = taskDiv.querySelector(".work");

    personalButton.addEventListener('click', () => {
        // Highlight the selected category
        personalButton.style.backgroundColor = "#4169e1"; // Light green background
        personalButton.style.color = "white"; // Dark green text
        workButton.style.backgroundColor = ""; // Reset other button
        workButton.style.color = "";
    });

    workButton.addEventListener('click', () => {
        // Highlight the selected category
        workButton.style.backgroundColor = "#4169e1"; // Light blue background
        workButton.style.color = "white"; // Dark blue text
        personalButton.style.backgroundColor = ""; // Reset other button
        personalButton.style.color = "";
    });

    // Create task
    taskDiv.querySelector("#create").addEventListener('click', () => {
        const text = taskDiv.querySelector(".inputTask").value.trim();
        const date = taskDiv.querySelector(".taskDate").value.trim();
        const time = taskDiv.querySelector(".taskTime").value.trim();
        const description = taskDiv.querySelector(".description").value.trim();
        const category = personalButton.style.backgroundColor
            ? "Personal"
            : workButton.style.backgroundColor
            ? "Work"
            : null;

        if (!text || !category) {
            alert("Please complete all required fields!");
            return;
        }

        const task = { text, completed: false, category, details: { date, time, description } };
        saveTaskToLocalStorage(task);
        addToDom(task.text, task.completed, task.category, task.details);

        onTaskAdded();

        mainDiv.remove();
    });

    // Cancel task creation
    taskDiv.querySelector("#cancel").addEventListener('click', () => mainDiv.remove());
});

function onTaskAdded() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks.length > 0) {
        // Do something when at least one task is added
        const taskNotification = document.getElementById("inspirationText");
        taskNotification.innerHTML = "Keep it up!! Complete your tasks. You almost there!"
    }
}

    
