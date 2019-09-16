const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    title: {
        type: String,
        require: true
    },

    image: {
        type: String,
    },

    description:{
        type:String,
        require:true
    },
    size: {
        type: String,
        required: true,
        default: ""
    }, 

    color: {
        type: String,
        required: true
    }, 
    
    price:{
        type:Number,
        required:true
    },

    date: {
        type: Date,
        required: false
    },

    owner: { type: ObjectId,
         ref: 'User',
         require: true
    }

})
