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
        unique: true
    },
    id:{
        type: Number,
        unique: true 
    }
})

module.exports = mongoose.model('comments',comments)