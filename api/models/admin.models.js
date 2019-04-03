const mongoose = require('mongoose')

const admin = mongoose.Schema({
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
    }
})


module.exports = mongoose.model('admin', admin)