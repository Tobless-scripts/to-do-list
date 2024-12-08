const options = { year: 'numeric', month: 'long', day: 'numeric' };

let dayDate = new Date().toLocaleDateString('en-US', options);
let day = document.getElementById("day");
day.innerHTML = dayDate;

// For adding new task
let addTask = document.getElementById("addTask");
addTask.addEventListener('click', () => {

    let divs = document.getElementById("divs");

    // Get main div
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("mainDiv");

    // Create new div for the task
    let taskDiv = document.createElement("div");
    taskDiv.classList.add('taskDiv');

    // Create text and style for task title
    let firstText = document.createElement("h2");
    firstText.classList.add("firstTask");
    firstText.textContent = "New Task";
    firstText.style.textAlign = "center";
    firstText.style.fontWeight = "2.1rem";
    firstText.style.padding = "1em";

    // Create input for task title
    let taskText = document.createElement("p");
    taskText.textContent = "Task Title";
    taskText.classList.add("taskText");

    let inputTask = document.createElement("input");
    inputTask.classList.add("inputTask");
    inputTask.type = "text";
    inputTask.placeholder = "Add Task Name";

    // Create category section
    let category = document.createElement("div");
    category.classList.add("category");

    let categoryText = document.createElement("p");
    categoryText.textContent = "Category";
    categoryText.classList.add("categoryText");

    // Category buttons
    let personalButton = document.createElement("button");
    personalButton.textContent = "Personal";
    personalButton.classList.add("personal");

    let workButton = document.createElement("button");
    workButton.textContent = "Work";
    workButton.classList.add("work");

    // Add description section
    let descriptionText = document.createElement("p");
    descriptionText.classList.add("categoryText");
    descriptionText.textContent = "Description";

    let description = document.createElement("textarea");
    description.classList.add("description");
    description.rows = 4;
    description.cols = 30;
    description.placeholder = "Add Description (Optional)";

    // Add date and time section
    let timeDiv = document.createElement("div");
    timeDiv.classList.add("timeDiv");

    let dates = document.createElement("div");

    let datename = document.createElement("p");
    datename.textContent = "Date";

    let taskDate = document.createElement("input");
    taskDate.classList.add("taskDate");
    taskDate.type = "date";

    let times = document.createElement("div");

    let timeName = document.createElement("p");
    timeName.textContent = "Time";

    let taskTime = document.createElement("input");
    taskTime.classList.add("taskTime");
    taskTime.type = "time";

    // Buttons for cancel and create task
    let cancel = document.createElement("div");
    cancel.classList.add("category");

    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("personal");

    let createButton = document.createElement("button");
    createButton.textContent = "Create";
    createButton.classList.add("work");

    // Create the task when the button is clicked
    createButton.addEventListener('click', () => {
        const value = inputTask.value.trim();
        const timeValue = taskTime.value.trim();
        const dateValue = taskDate.value.trim();
        const descriptionValue = description.value.trim();
    
        // Validate inputs
        if (!value || !timeValue || !dateValue) {
            alert("Please complete all required fields.");
            return;
        }
    
        // Determine selected category
        const isPersonalSelected = personalButton.style.border.includes("solid");
        const isWorkSelected = workButton.style.border.includes("solid");
    
        if (!isPersonalSelected && !isWorkSelected) {
            alert("Please select a category!");
            return;
        }
    
        // Create task content
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("taskContainer");
    
        const taskText = document.createElement("p");
        taskText.classList.add("taskText");
        taskText.textContent = `${value}`;
    
        const check = document.createElement("input");
        check.type = "checkbox";
        check.classList.add("check");
    
        check.addEventListener('click', () => {
            taskText.style.textDecoration = check.checked ? "line-through" : "none";
            taskText.style.color = check.checked ? "#aeaeae" : "black";
        });
    
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener('click', () => {
            taskContainer.remove();
        });

        let tasksHome = document.createElement("div")
        tasksHome.classList.add("tasksHome")
    
        tasksHome.appendChild(check);
        tasksHome.appendChild(taskText);
        tasksHome.appendChild(removeBtn);
        taskContainer.appendChild(tasksHome)

        taskContainer.appendChild(tasksHome);

        taskContainer.addEventListener('click', () => {
            // Check if taskDetails already exists
            let existingTaskDetails = taskContainer.querySelector(".taskDetails");
        
            if (existingTaskDetails) {
                // If taskDetails exists, remove it (toggle off)
                taskContainer.removeChild(existingTaskDetails);
            } else {
                // If taskDetails doesn't exist, create and display it (toggle on)
                let taskDetails = document.createElement("div");
                taskDetails.classList.add("taskDetails");
        
                let timeSelected = document.createElement("p");
                let dateSelected = document.createElement("p");
                let descriptionAdded = document.createElement("p");
        
                timeSelected.innerHTML = `Task should be performed at ${timeValue}`;
                dateSelected.innerHTML = `Task date is ${dateValue}`;
                const currentDate = new Date()
                if (dateValue === currentDate.toISOString().split('T')[0]) {
                    dateSelected.innerHTML = `Task date is today`;
                }
                descriptionAdded.innerHTML = `Description: ${descriptionValue}`;
        
                taskDetails.appendChild(timeSelected);
                taskDetails.appendChild(dateSelected);
                taskDetails.appendChild(descriptionAdded);
        
                taskContainer.appendChild(taskDetails);
            }
        });
        
    
        // Append to the correct container based on category
        if (isPersonalSelected) {
            document.getElementById("divs2").appendChild(taskContainer);
        } else if (isWorkSelected) {
            document.getElementById("taskContent").appendChild(taskContainer);
        }
    
        // Toggle visibility based on button clicks
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
    
        // Reset category selection and remove the modal
        personalButton.style.border = "none";
        workButton.style.border = "none";
        mainDiv.remove();
    });
    
    
    // Append all content for task creation form
    category.appendChild(personalButton);
    category.appendChild(workButton);

    dates.appendChild(datename);
    dates.appendChild(taskDate);
    times.appendChild(timeName);
    times.appendChild(taskTime);

    timeDiv.appendChild(dates);
    timeDiv.appendChild(times);

    cancel.appendChild(cancelButton);
    cancel.appendChild(createButton);

    taskDiv.appendChild(firstText);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(inputTask);
    taskDiv.appendChild(categoryText);
    taskDiv.appendChild(category);
    taskDiv.appendChild(descriptionText);
    taskDiv.appendChild(description);
    taskDiv.appendChild(timeDiv);
    taskDiv.appendChild(cancel);

    mainDiv.appendChild(taskDiv);
    divs.appendChild(mainDiv);

    // Cancel button logic
    cancelButton.addEventListener('click', () => {
        mainDiv.remove();
    });

    // Border selection for category buttons
    personalButton.addEventListener('click', () => {
        personalButton.style.border = "2px solid #aeaeae";  // Add border for selected category
        workButton.style.border = "none";                   // Remove border from the other category
    });

    workButton.addEventListener('click', () => {
        workButton.style.border = "2px solid #aeaeae";      // Add border for selected category
        personalButton.style.border = "none";               // Remove border from the other category
    });
});
