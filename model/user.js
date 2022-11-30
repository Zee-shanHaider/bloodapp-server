const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    isDonor:{
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('User', userSchema)