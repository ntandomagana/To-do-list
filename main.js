import {saveTask} from './frontback.js';

const arr = JSON.parse(localStorage.getItem("todolist")) || [];
// const todoList = [];

function addTask() {
    var task = document.getElementById("input-box");
    var index = arr.length - 1;
    
    var taskValue = task.value;
    if (taskValue === "") {
        alert("Please enter a task");
        return;
    }
    
    let taskObj = {
        id: index ,
        task: taskValue,
        isDone: false,
    }
    
    saveTask(taskObj);

    // Add the task to the array
    arr.push(taskValue);


    var input = document.getElementById("myTodolist");
    var divTag = document.createElement("div");
    var singleTask = document.createElement("li");
    var deleteButton = document.createElement("button");
    var editbutton = document.createElement("button");
    var divButton = document.createElement("div")

    deleteButton.className = "delete";
    editbutton.className = "edit";
    divButton.className = "buttons";
    divTag.className = "taskList";



    deleteButton.innerHTML = "Delete";
    editbutton.innerHTML = "Edit";

    


    divTag.appendChild(singleTask);
    divTag.appendChild(divButton);
    divButton.appendChild(deleteButton);
    divButton.appendChild(editbutton);
    


    singleTask.innerHTML = taskValue;
    input.appendChild(divTag); 

    deleteButton.onclick = function () {

        var deletequestion = prompt(`Are you sure you want to delete ${singleTask.innerHTML}? Type yes or no. `);
        if (deletequestion === "no") {
            return;
        }
        deleteTask(index, divTag);
    };

    editbutton.onclick = function () {
        editTask(index, singleTask);
    };
    singleTask.onclick = function () {
        taskDone(index,singleTask);
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
        var editbutton = document.createElement("button");
        var divButton = document.createElement("div")

        deleteButton.className = "delete";
        editbutton.className = "edit";
        divButton.className = "buttons";
        divTag.className = "taskList";



        deleteButton.innerHTML = "Delete";
        editbutton.innerHTML = "Edit";
    
        

        divTag.appendChild(singleTask);
        divTag.appendChild(divButton);
        divButton.appendChild(deleteButton);
        divButton.appendChild(editbutton);
        

        singleTask.innerHTML = taskValue;
        input.appendChild(divTag);

        deleteButton.onclick = function () {

            // Ask user for confirmation before deleting the task
            var deletequestion = confirm(`Are you sure you want to delete ${singleTask.innerHTML}`);
            if (deletequestion === "no") {
                return;
            }
            deleteTask(index, divTag); 
        };

        editbutton.onclick = function () {
            editTask(index, singleTask);
        };

        singleTask.onclick = function () {
            taskDone(index,singleTask);
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
    confirm("Are you sure you want to clear all tasks?");
    localStorage.removeItem("todolist");
    location.reload();
}

function taskDone(index, taskElement) {

    taskElement.style.textDecoration = "line-through";
    taskElement.style.color = "gray";
    

}
function addToStorage(){
    localStorage.setItem("todolist", JSON.stringify(arr));
}

window.addTask = addTask;
// export { todoList }