const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true, 'Most provide email'],
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'Please provide valid email'
        }
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:12
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;