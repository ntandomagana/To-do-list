import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';
const {Pool} = pkg;

const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());


const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'todolist_db',
    password: '',
    port: 5432,
});


app.get('/', async (req, res) => {
    const response = res.send("Hello, world!");
    return response.json();
});

app.get('/getAllTasks', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM todotasks');
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }

});

//for saving a task
app.post('/saveTasks', async (req, res) => {                                             
    const {id, task, isDone} = req.body;
    try {
        const results = await pool.query('INSERT INTO todotasks (id, task, isDone) VALUES ($1, $2, $3) ', [id, task, isDone]);
        res.json(results.rows)
    } catch (error) {
        console.error(error.message);
        response.status(500).json("Server error");        
    }
});


app.put('/editTasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const {task, isDone} = req.body;
    try {
        const results = await pool.query('UPDATE todotasks SET task=$1, isDone=$2 WHERE id=$3', [task, isDone, id]);
        res.json(results.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");        
    }
});

app.delete('/deleteTasks/:id', async (req, res) => { 
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query('DELETE FROM todotasks WHERE id=$1 RETURNING *', [id]);
        if (results.rows.length > 0) {
            res.status(200).json({
                message: `Task with ID ${id} was deleted successfully.`,
            });
        } else {
            res.status(404).json({
                message: `Task with ID ${id} not found.`,
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");        
    }
})


// export default { app };
app.listen(PORT, ()=> {
    console.log(`Server running on port http://localhost:${PORT}`)
});