import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_db',
    password: '',
    port: 5432,
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todoTask;')
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error message'});
    }
})

app.get('todo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(`SELECT * FROM todotask WHERE id = $1;`, [id])
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error message'});
    }
})

app.get('/todo', async (req, res) => {
    try {
        const result = await pool.query('CREATE TABLE IF NOT EXISTS todotask(id VARCHAR(255),task VARCHAR(255), taskDone VARCHAR(255))');
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "error message" });
    }
})

app.post('/todo', async (req, res) => {
    const {id, task, taskDone} = req.body;
    try {
        const result = await pool.query(`INSERT INTO todotask(id, task, taskDone) VALUES($1, $2, $3)`, [id, task, taskDone]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "error message" });
    }
})

app.put('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const {task, taskDone} = req.body;
    try {
        const result = await pool.query('UPDATE todotask SET task = $2, taskdone = $3 WHERE id = $1 RETURNING *', [id, task, taskDone]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "error message" });
    }
})

app.delete('/todo/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM todotask WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount > 0) {
            res.status(200).json({
                message: `Task with ID ${id} deleted successfully.`,
            });
        } else {
            res.status(404).json({
                message: `No task entry found for ID ${id}.`
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "error message" });
    }
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
