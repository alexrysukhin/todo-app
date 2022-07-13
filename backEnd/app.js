const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonParser = express.json();
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/todos", (request, response) => {
    try {
        const todos = JSON.parse(fs.readFileSync("todoBase.json", "utf-8"));
        response.send(todos);
    } catch (err) {
        response.send("something happened with connection");
    }
});

app.get("/api/todos/:id", (request, response) => {
    const id = request.params.id;
    const content = fs.readFileSync("todoBase.json", "utf-8");
    const todos = JSON.parse(content);

    let todo = null;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todo = todos[i];
        }
    }
    if (todo) {
        response.send(todo);
    } else {
        response.status(400).send("failed");
    }
});

app.post("/api/todos", jsonParser, (request, response) => {
    if (!request.body) return response.status(400);
    const title = request.body.title;
    const id = request.body.id;
    const dateOfCreation = `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDay()} at ${new Date().getHours()}-${new Date().getMinutes()}`;
    const dateOfCompletion = null;
    const todo = { id: id, title: title, visible: true, dateOfCreation, dateOfCompletion };

    let content = fs.readFileSync("todoBase.json", "utf-8");
    let todos = JSON.parse(content);
    todos.push(todo);

    fs.writeFileSync("todoBase.json", JSON.stringify(todos));
    response.json(todos);
});

app.delete("/api/todos/:id", jsonParser, (request, response) => {
    let id = request.params.id;
    let todos = JSON.parse(fs.readFileSync("todoBase.json", "utf-8"));

    let index = -1;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            index = i;
            break;
        }
    }

    if (index > -1) {
        todos.splice(index, 1)[0];
        fs.writeFileSync("todoBase.json", JSON.stringify(todos));
        response.json(todos);
    } else {
        response.status(400).send("no such identifier");
    }
});

app.put("/api/todos", jsonParser, (request, response) => {
    console.log(request.body);
    let id = request.body.id;
    let title = request.body.title;
    let visible = request.body.visible;

    let todos = JSON.parse(fs.readFileSync("todoBase.json", "utf-8"));

    let todo;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todo = todos[i];
            break;
        }
    }

    if (todo) {
        todo.title = title;
        todo.visible = visible;
        todo.dateOfCompletion = `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDay()} at ${new Date().getHours()}-${new Date().getMinutes()}`;
        fs.writeFileSync("todoBase.json", JSON.stringify(todos));
        response.json(todos);
    } else {
        response.status(400).send("Cant`t update.");
    }
});

app.get("/api/history", (request, response) => {
    response.send(fs.readFileSync("historyBase.json", "utf-8"));
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
