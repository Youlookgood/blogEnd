const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var articles = new Schema({
    title:{
        type: String,
        unique: true
    },
    content:{
        type: String
    },
    comments:{
        type: Boolean
    },
    upTime:{
        type: Number
    },
    author:{
        type: String
    },
    serial:{
        type: Number,
        unique: true
    },
    status:{
        type: Number
    },
    message:{
        type: String
    }
})

module.exports = mongoose.model('artic', articles)
