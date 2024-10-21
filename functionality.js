const arr = [];

function addTask(task) {
    var index = arr.lenght - 1;
    var taskValue = task.value;
    if (taskValue === "") {
        alert("Please enter a task");
        return;
    }

    arr.push(taskValue);
}

function deleteTask(index) {
    arr.splice(index, 1);
}

function editTask(index,newTaskValue) {
    // var newTaskValue = prompt("Edit your task:", arr[index]);
    if (newTaskValue !== null && newTaskValue.trim() !== "") {
        arr[index] = newTaskValue;
        // taskElement.innerHTML = newTaskValue;
        // addToStorage();
    }


}

function taskDone(index, taskElement) {

    taskElement.style.textDecoration = "line-through";
    taskElement.style.color = "gray";
    

}



export {arr, addTask, deleteTask, editTask, taskDone};




