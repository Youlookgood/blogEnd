const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let comments = new Schema({
    name:{
        type: String
    },
    content:{
        type: String
    },
    page:{
        type: String
    },
    time:{
        type: Number,
    },
    email:{
        type: String
    },
    address:{
        type: String
    },
    serial:{
        type: Number,
        unique: true
    },
    status:{
        type: Number
    },
    relation:{
        type: Number
    }
})

module.exports = mongoose.model('comments',comments)