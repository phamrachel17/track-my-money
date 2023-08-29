const ExpenseSchema = require('../models/expenseModel')

exports.addExpense = async (req, res) => {
    //console.log(req.body);
    const { title, amount, category, description, date, email } = req.body
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        email
    })
    try {
        // validations
        if (!title || !category || !description || !date){
            return res.status(400).json({message: 'Please fill in all fields!'})
        }
        if (amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a number greater than 0!'})
        }
        await expense.save()
        res.status(200).json({message: 'Expense added successfully!'})
    } catch (error) {
        res.status(500).json({message: 'There is a server error'})
    }
    console.log(expense)
}

exports.getExpense = async (req, res) => {
    const {email} = req.params;
    try {
        const expense = await ExpenseSchema.find({email: email}).sort({createdAt: -1})
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({message: 'There is a server error'})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: 'Expense deleted successfully!'})
        })
        .catch((err) => {
            res.status(500).json({message: 'There is a server error'})
        })
}