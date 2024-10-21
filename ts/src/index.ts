// Create a simple RESTful API using Node.js and Express that allows users to manage a list of tasks. Each task should have the following properties:

import { Taks } from "./task.model";

// - id (number): Unique identifier for the task
// - title (string): Title of the task
// - completed (boolean): Indicates whether the task is completed
// The API should support the following endpoints:

// GET /tasks - Retrieve all tasks
// POST /tasks - Create a new task
// PUT /tasks/:id - Update an existing task by ID
// DELETE /tasks/:id - Delete
// Requirements:
// - Use Node.js and Express for the backend.
// - Use in-memory storage (an array) for tasks (no database required).
// - Validate incoming data for the POST and PUT requests.
// - Ensure that the API follows RESTful conventions


const express = require('express');
const app = express();
app.use(express.json())

let tasks: Taks[] = [];
let idCounter: number = 1;

function validationBody(body: any) {
    if (!body.title) {
        throw new Error("Title not found!")
    }
    if (!body.completed) {
        throw new Error("Completed not found!")
    }
}

app.get('/task', (req: any, res: any) => {
    res.json(tasks);
});

app.post('/task', (req: any, res: any) => {
    validationBody(req.body);
    let title: string = req.body.title;
    let completed: boolean = req.body.completed;
    const taks: Taks = {
        id: idCounter,
        title: title,
        completed: completed
    };
    tasks.push(taks);
    idCounter++;
    res.json(taks);
});

app.put('/task/:id', (req: any, res: any) => {
    let title: string = req.body.title;
    let completed: boolean = req.body.completed;
    const id = req.params.id;

    const index = tasks.findIndex((t) => t.id === Number(id));
    if (index < 0) {
        throw new Error("ID not found!");
    }
    tasks[index].title = title;
    tasks[index].completed = completed;

    res.json(tasks[index]);
});

app.delete('/task/:id', (req: any, res: any) => {
    const id = req.params.id;
    const index = tasks.findIndex((t) => t.id === Number(id));
    if (index < 0) {
        throw new Error("ID not found!");
    }

    tasks.splice(index, 1);

    res.status(204).send()
});


app.listen(3000, () => {
    console.log('Server running 3000')
})