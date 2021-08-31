const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
        const userIn = new user (req.body)///////////
        try{
           await userIn.save()
           const token = await userIn.generateToken()
           res.status(200).send({userIn,token})
        }
        catch(e){
            res.status(400).send(e)
        }
     
})

router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        res.send('Try again ' + e)
    }
})

module.exports = router