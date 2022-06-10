const express = require('express');
const model = require('./model');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.use(cors())


app.get('',(req,res)=>{
    res.json({'hello':'world'})
})

app.get('/todo',(req,res)=>{
    res.json(model.getAllTodo())
})

app.get('/todo/:id',(req,res)=>{
    console.log(req.params.id)
    res.json(model.getTodo(req.params.id))
})

app.post('/todo/create',(req,res)=>{
    const todo = req.body.todo;
    console.log(todo)
    model.createTodo(todo)
    res.json(model.getAllTodo())
})

app.post('/todo/complete',(req,res)=>{
    const idsToComplete = req.body.list;
    for( let id in idsToComplete){
        model.completeTodo(idsToComplete[id])
    }
        res.json(model.getAllTodo())
})

app.listen(8000,()=>{
    console.log('port listening at localhost:8000/')
})
