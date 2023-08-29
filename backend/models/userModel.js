const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true   // removes white space
    },
    displaypicture: {
        type: String
    },
    }, {timestamps: true})      // activate timestamp when we create/update an item

    module.exports = mongoose.model('User', UserSchema)