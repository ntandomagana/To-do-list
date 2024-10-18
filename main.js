const arr = JSON.parse(localStorage.getItem("todolist")) || [];




function addTask() {
    var task = document.getElementById("input-box");
    
    var taskValue = task.value;
    if (taskValue === "") {
        alert("Please enter a task");
        return;
    }

    // Add the task to the array
    arr.push(taskValue);
    var taskIndex = arr.length - 1;

    var input = document.getElementById("myTodolist");
    var divTag = document.createElement("div");
    var singleTask = document.createElement("li");
    var deleteButton = document.createElement("button");
    var editbutton = document.createElement("button");

    deleteButton.className = "delete";
    editbutton.className = "edit";
    deleteButton.innerHTML = "Delete";
    editbutton.innerHTML = "Edit";


    divTag.appendChild(singleTask);
    divTag.appendChild(deleteButton);
    divTag.appendChild(editbutton);
    divTag.style.display = "flex";


    singleTask.innerHTML = taskValue;
    input.appendChild(divTag); 

    deleteButton.onclick = function () {

        // Ask user for confirmation before deleting the task
        var deletequestion = prompt(`Are you sure you want to delete ${singleTask.innerHTML}? Type yes or no. `);
        if (deletequestion === "no") {
            return;
        }
        deleteTask(index, divTag); 
    };

    editbutton.onclick = function () {
        editTask(index, singleTask);
    };

    addToStorage();

    task.value = '';
}




function displayExistingTasks() {
    var input = document.getElementById("myTodolist");
    input.innerHTML = ''; // Clear the list to avoid duplication

    arr.forEach((taskValue, index) => {
        var divTag = document.createElement("div");
        var singleTask = document.createElement("li");
        var deleteButton = document.createElement("button");
        var editButton = document.createElement("button");

        // Set button styles and text
        deleteButton.className = "delete";
        editButton.className = "edit";
        deleteButton.innerHTML = "Delete";
        editButton.innerHTML = "Edit";

        // Append task and buttons to the div
        divTag.appendChild(singleTask);
        divTag.appendChild(deleteButton);
        divTag.appendChild(editButton);
        divTag.style.display = "flex";

        singleTask.innerHTML = taskValue;
        input.appendChild(divTag);

        deleteButton.onclick = function () {

            // Ask user for confirmation before deleting the task
            var deletequestion = prompt(`Are you sure you want to delete ${singleTask.innerHTML}? Type yes or no.`);
            if (deletequestion === "no") {
                return;
            }
            deleteTask(index, divTag); 
        };

        editButton.onclick = function () {
            editTask(index, singleTask);
        };
    });
}

function deleteTask(index, taskElement) {
    arr.splice(index, 1);
    taskElement.remove();
    addToStorage();
}

function editTask(index, taskElement) {
    var newTaskValue = prompt("Edit your task:", arr[index]);
    if (newTaskValue !== null && newTaskValue.trim() !== "") {
        arr[index] = newTaskValue;
        taskElement.innerHTML = newTaskValue;
        addToStorage();
    }
}

displayExistingTasks();


function clearAll(){
    prompt("Are you sure you want to clear all tasks?");
    localStorage.removeItem("todolist");
    location.reload();
}




function addToStorage(){
    localStorage.setItem("todolist", JSON.stringify(arr));
}
