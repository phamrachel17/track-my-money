const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true      // removes white space
    },
    type: {
        type: String,
        default: "expense"   // default value
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    email: {
            type: String,
            required: true,
            maxLength: 100,
            trim: true
        },
    }, {timestamps: true})      // activate timestamp when we create/update an item

    module.exports = mongoose.model('Expense', ExpenseSchema)