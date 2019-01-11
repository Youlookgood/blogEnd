const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    age: Number,
    address: String,
    createAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('users', userSchema);