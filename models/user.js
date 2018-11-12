const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');

const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: false,
        minlength:3,
        maxlength:50,
        unique: true
    },
    fullName:{
        type: String,
        required: true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required: true,
        minlength:5,
        maxlength:255,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minlength:8,
        maxlength:1024
    },
    age:{
        type: Number,
        max: 99,
        min:16
    },
    phoneNumber: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin},config.get('UserToken'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        username: Joi.string().min(3).max(50),
        fullName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        age: Joi.number().min(16).max(99),
        phoneNumber: Joi.string().required()
        
    };
    return Joi.validate(user, schema);
}
exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;