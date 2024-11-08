async function saveTask(task) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(task)
    }
    
    await fetch('http://localhost:3000/saveTasks', options)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
}

export  {saveTask};

