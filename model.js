const sqlite = require('better-sqlite3');

const db = new sqlite('todo.db');


db.exec(`CREATE TABLE IF NOT EXISTS todo(
todoId INTEGER PRIMARY KEY NOT NULL,
todo TEXT NOT NULL,
completed BOOLEAN NOT NULL CHECK (completed IN (0,1))
);
`);

function getAllTodo(){
    const todos = db.prepare(`SELECT * FROM todo`).all()
    return todos
}

function getAllTrueTodo(){
    const completedTodo = db.prepare(`
    SELECT * FROM todo WHERE completed = 1`).all();
    if(!completedTodo){
        return false
    }
    else{return completedTodo}
}

function getAllFalseTodo(){
    const uncompletedTodo = db.prepare(`
    SELECT * FROM todo WHERE completed = 0`).all();
    if(!uncompletedTodo){
        return false
    }
    else{return uncompletedTodo}
}

function createTodo(todo){
    db.prepare(`INSERT INTO todo(todo,completed) 
    VALUES(?,0)`).run(todo)
}


function getTodo(todo){
    const todo2 = db.prepare(`
    SELECT * FROM todo WHERE todoId = ?`).get(todo);
    if(!todo2){
        return false
    }
    else{return todo2}
}

function completeTodo(id){
    console.log(id)
    db.prepare(`UPDATE todo SET completed = 1 WHERE todoId = ?`).run(id)
}

function deleteTodo(id){
    db.prepare(`DELETE FROM todo WHERE todoId = ?`).run(id)
}

function deleteAllCompletedTodo(){
    db.prepare(`DELETE FROM todo WHERE completed = 1`).all();
}


module.exports = {
    getAllTodo,
    getAllTrueTodo,
    getAllFalseTodo,
    createTodo,
    getTodo,
    completeTodo,
    deleteTodo,
    deleteAllCompletedTodo,
}
//
