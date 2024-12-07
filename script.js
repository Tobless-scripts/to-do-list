const options = {year: 'numeric', month: 'long', day: 'numeric'}

let dayDate = new Date().toLocaleDateString('en-Us', options)

let day = document.getElementById("day");
day.innerHTML= dayDate



//For adding new task
let addTask = document.getElementById("addTask");
addTask.addEventListener('click', () => {

    //Append all content
    let divs = document.getElementById("divs")

    //Get main div 
    let mainDiv = document.createElement("div")
    mainDiv.classList.add("mainDiv")

    //Create new div
    let taskDiv = document.createElement("div");
    taskDiv.classList.add('taskDiv');

    //Create text and style
    let firstText = document.createElement("h2");
    firstText.classList.add("firstTask")
    firstText.textContent = "New Task"
    firstText.style.textAlign = "center"
    firstText.style.fontWeight = "2.1rem"
    firstText.style.padding = "1em"

    //Create input for task
    let taskText = document.createElement("p");
    taskText.textContent = "Task Title"
    taskText.classList.add("taskText")

    let inputTask = document.createElement("input");
    inputTask.classList.add("inputTask")
    inputTask.type = "text";
    inputTask.placeholder = "Add Task Name"

    //Create category section
    let category = document.createElement("div");
    category.classList.add("category")
    
    
    let categoryText = document.createElement("p");
    categoryText.textContent = "Category"
    categoryText.classList.add("categoryText")

    //Add buttons
    let personalButton = document.createElement("button");
    personalButton.textContent = "Personal"
    personalButton.classList.add("personal")

    let workButton = document.createElement("button");
    workButton.textContent = "Work"
    workButton.classList.add("work")

    //Add description 
    let descriptionText = document.createElement("p");
    descriptionText.classList.add("categoryText")
    descriptionText.textContent = "Desription"

    let description = document.createElement("textarea");
    description.classList.add("description")
    description.rows = 5;
    description.cols = 30
    description.placeholder = "Add Description"

    //Add div for date and time
    let timeDiv = document.createElement("div")
    timeDiv.classList.add("timeDiv")

    //Add date to task
    let taskDate = document.createElement("input");
    taskDate.classList.add("taskDate")
    taskDate.type = "date"

    //Add time to task
    let taskTime = document.createElement("input");
    taskTime.classList.add("taskTime")
    taskTime.type = "time"

     //Add buttons for cancel and create
     let cancel = document.createElement("div");
     cancel.classList.add("category")

     let cancelButton = document.createElement("button");
     cancelButton.textContent = "Cancel"
     cancelButton.classList.add("personal")

 
     let createButton = document.createElement("button");
     createButton.textContent = "Create"
     createButton.classList.add("work")

    //append all content

    category.appendChild(personalButton)
    category.appendChild(workButton)

    timeDiv.appendChild(taskDate)
    timeDiv.appendChild(taskTime)

    cancel.appendChild(cancelButton)
    cancel.appendChild(createButton)


    taskDiv.appendChild(firstText)
    taskDiv.appendChild(taskText)
    taskDiv.appendChild(inputTask)
    taskDiv.appendChild(categoryText)
    taskDiv.appendChild(category)
    taskDiv.appendChild(descriptionText)
    taskDiv.appendChild(description)
    taskDiv.appendChild(timeDiv)
    taskDiv.appendChild(cancel)



    mainDiv.appendChild(taskDiv)
    divs.appendChild(mainDiv)

     //Remove task
     cancelButton.addEventListener('click', () => {
        mainDiv.remove()
     })
})