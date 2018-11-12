const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
const {userSchema} = require('./user');




const publicationSchema = new mongoose.Schema({
    titre:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50,
        unique: false
    },
    photo:{
        type: String,
        required: true,
        minlength:5,
        maxlength:50
    },
    description:{
        type:String,
        required: false,
        minlength:5,
        maxlength:255,
        unique: false
    },
    user:{
        type:userSchema,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});




const Publication = mongoose.model('Publication', publicationSchema);

function validatePublication(publication){
    const schema = {
        titre: Joi.string().min(3).max(50).required(),
        photo: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(255).required(),
        user: Joi.object().required(),
        
    };
    return Joi.validate(publication, schema);
}
exports.Publication = Publication;
exports.validate = validatePublication;