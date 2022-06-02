const express = require('express');
const model = require('./model');
const cors = require('cors');
const app = express();

//app.use(express.json)

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

app.post('/todo/post',(req,res)=>{
    const todo = req.body.todo;
    console.log(todo)
    model.createTodo(todo)
    res.json({msg:'aight'})
})


app.listen(8000,()=>{
    console.log('port listening at localhost:8000/')
})
