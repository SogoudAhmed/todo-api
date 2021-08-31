const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

const todo = mongoose.model('todos',newsSchema)
module.exports = todo