const mongoose = require('mongoose');

// SChema
const usersSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: String,
    email: {
        required: true,
        type: String
    },
});

// Model
const User=mongoose.model('User',usersSchema);


module.exports= User;