const sqlite = require('better-sqlite3');

const db = new sqlite('todo.db');


db.exec(`CREATE TABLE IF NOT EXISTS todo(
todoId INTEGER PRIMARY KEY NOT NULL,
todo TEXT NOT NULL
);
`);

function getAllTodo(){
    const todos = db.prepare(`SELECT * FROM todo`).all()
    return todos
}


function createTodo(todo){
    db.prepare(`INSERT INTO todo(todo) 
    VALUES(?)`).run(todo)
}


function getTodo(todo){
    const todo2 = db.prepare(`
    SELECT * FROM todo WHERE todoId = ?`).get(todo);
    if(!todo2){
        return false
    }
    else{return todo2}
}



module.exports = {
    getAllTodo,
    createTodo,
    getTodo,
}
//
