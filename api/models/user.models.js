const mongoose = require('mongoose')
const db = require('../models/db')

const user = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    nama : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    gender : String
})

module.exports = mongoose.model('users', user)