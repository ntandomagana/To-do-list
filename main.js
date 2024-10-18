const arr = JSON.parse(localStorage.getItem("todolist")) || [];


function addTask(){
    var task = document.getElementById("input-box");
    
    var taskValue = task.value;
    if (taskValue === ""){
        alert("Please enter a task");
        return;
    }
    console.log(taskValue);


    var input = document.getElementById("myTodolist");
    var divTag = document.createElement("div");
    var singleTask = document.createElement("li");
    var deleteButton = document.createElement("button");
    var editbutton = document.createElement("button");

    deleteButton.className = "delete";
    editbutton.className = "edit";


    deleteButton.innerHTML = "Delete";
    
    deleteButton.onclick = function () {
        console.log(this.singleTask);

    }
    editbutton.innerHTML = "edit";

    divTag.appendChild(singleTask);
    divTag.appendChild(deleteButton);
    divTag.appendChild(editbutton);

    divTag.style.display = "flex";
    
    
    arr.push(taskValue);

    singleTask.innerHTML = taskValue;
    console.log(arr);
    input.appendChild(divTag);
    addToStorage();
    
}


function displayExistingTasks(){
    var input = document.getElementById("myTodolist");

    arr.forEach(element => {
        var divTag = document.createElement("div");
        var singleTask = document.createElement("li");
        var deleteButton = document.createElement("button");
        var editbutton = document.createElement("button");

        // deleteButton.addEventListener('click', function () {
        //     console.log(index);
        //     console.log(divTag);
        //     deleteTask(index, divTag); 
        // });
        deleteButton.onclick = function () {
            console.log(this.singleTask);
    
        }

        deleteButton.className = "delete";
    editbutton.className = "edit";


    deleteButton.innerHTML = "Delete";
    editbutton.innerHTML = "edit";

    divTag.appendChild(singleTask);
    divTag.appendChild(deleteButton);
    divTag.appendChild(editbutton);

    divTag.style.display = "flex";
    singleTask.innerHTML = element;

    input.appendChild(divTag);
    });
}

function deleteTask(index, taskElement) {
    arr.splice(index, 1);
    taskElement.remove();
    addToStorage();
}

displayExistingTasks();


function clearAll(){
    alert("Are you sure you want to clear all tasks?");
    localStorage.removeItem("todolist");
    location.reload();
}




function addToStorage(){
    localStorage.setItem("todolist", JSON.stringify(arr));
}
