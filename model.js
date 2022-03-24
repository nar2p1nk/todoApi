const sqlite = require('better-sqlite3');

const db = new sqlite('todo.db');


db.exec(`CREATE TABLE IF NOT EXISTS todo(
todoId INTEGER PRIMARY KEY NOT NULL,
todo TEXT NOT NULL
);
`);



function createTodo(todo){
    db.prepare(`INSERT INTO todo(todo) 
    VALUES(?)`).run(todo)
}


function findTodo(todo){
    const todo2 = db.prepare(`
    SELECT * FROM todo WHERE todo = ?`).get(todo);
    if(!todo2){
        console.log('there is no user by that name')
        return false
    }
    else{return todo2}
}

createTodo('code todoApi')

module.exports = {
    createTodo,
    findTodo,
}
//
