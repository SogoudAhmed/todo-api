
const express = require('express')
const Todo = require('../models/todo')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/todo',auth,async(req,res)=>{
    const todo = new Todo({...req.body,owner:req.reporter._id})
    try{
        await todo.save()
        res.status(200).send(todo)
    }
    catch(e){
        res.status(400).send(e)
    }
})


router.get('/todos',auth,async(req,res)=>{
    try{
       await req.user.populate('todos').execPopulate()
       res.send(req.user.todos)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.get('/todos/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const todo = await Todo.findOne({_id,owner:req.reporter._id})
        if(!todo){
            return res.status(404).send('Todo not found')
        }
        res.status(200).send(todo)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.patch('/todos/:id',auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try{
        const todo = await Todo.findOne({_id,owner:req.reporter._id})
        if(!todo){
            return res.status(404).send('Todos is not found')
        }
        updates.forEach((update)=> todo [update] = req.body[update])
        await todo.save()
        res.send(todo)
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.delete('/todos/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const todo = await Todo.findOneAndDelete({_id,owner:req.reporter._id})
        if(!todo){
            return res.status(404).send('Todos is not found')
        }
        res.send(todo)
    }
    catch(e){
        res.status(500).send(e)
    }
})



module.exports = router