const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json());

// Routes

/* Create a todo */
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );
        res.json(newTodo)
        console.log(req.body)
    } catch (err) {
        console.error(err.message);
    }
})

/* Get a todo */
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json(todo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

/* Get all todos */
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

/* Delete a todo */
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Todo is deleted");
    } catch (err) {
        console.error(err.message);
    }
})

/* Update a todo */
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Todo is updated");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(3001, () => {
    console.log("server has started on port 3001");
});