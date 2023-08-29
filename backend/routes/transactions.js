const router = require('express').Router();
const {addIncome, getIncomes, deleteIncome} = require('../controllers/income');
const {addExpense, getExpense, deleteExpense} = require('../controllers/expense');

router.post('/add-income', addIncome)
    .get('/get-incomes/:email', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense/:email', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router