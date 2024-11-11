function sendTask(taskObj) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(taskObj),
    };
    fetch("http://localhost:3000/saveTask", options)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
  
  async function getTasks() {
    let myData = {};
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
  
    try {
      await fetch("http://localhost:3000/tasks", options)
        .then((response) => response.json())
        .then((data) => {
          myData = data;
        });
    } catch (err) {
      console.log("Error:", "failed to get tasks");
    }
  
    return myData;
  }
  
  async function updateTask(task) {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(task),
    };
    try {
      await fetch("http://localhost:3000/updateTask", options)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    } catch (err) {
      console.log("Error:", "failed to update task");
    }
  }
  
  function deleteTask(id) {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: id }),
    };
    fetch(http://localhost:3000/deleteTask, options)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
  
  function deleteAllTasks() {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    fetch(http://localhost:3000/deleteAll, options)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
  
  export { deleteTask, getTasks, sendTask, updateTask, deleteAllTasks };