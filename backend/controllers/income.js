const IncomeSchema = require('../models/incomeModel')

exports.addIncome = async (req, res) => {
    //console.log(req.body);
    const { title, amount, category, description, date } = req.body
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        // validations
        if (!title || !category || !description || !date){
            return res.status(400).json({message: 'Please fill in all fields!'})
        }
        if (amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a number greater than 0!'})
        }
        await income.save()
        res.status(200).json({message: 'Income added successfully!'})
    } catch (error) {
        res.status(500).json({message: 'There is a server error'})
    }
    console.log(income)
}

exports.getIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'There is a server error'})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income deleted successfully!'})
        })
        .catch((err) => {
            res.status(500).json({message: 'There is a server error'})
        })
}