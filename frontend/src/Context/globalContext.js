import React, { useContext, useState } from "react"
import axios from 'axios'
import { useAuthContext } from "../Hooks/useAuthContext"

/*
    connecting api functions to the frontend
*/

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const user = useAuthContext()
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // setting user
    const loginUser = async (user) => {
        const response = await axios.post(`${BASE_URL}login`, user)
        //setUser(response.data)
    }

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes(user.email)
    }

    const getIncomes = async (email) => {
        const response = await axios.get(`${BASE_URL}get-incomes/${email}`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes(user.email)
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        
        return totalIncome;
    }


    //calculate expenses
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpense(user.email)
    }

    const getExpense = async (email) => {
        const response = await axios.get(`${BASE_URL}get-expense/${email}`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpense(user.email)
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })

        return totalExpense;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    // Monthly data calculations for the past 6 months
    const monthlyExpenses = () => {
        const currentDate = new Date();
        let past6MonthsExpenses = [];

        for (let i = 0; i < 6; i++) {
            let month = currentDate.getMonth() - i;
            let year = currentDate.getFullYear();

            if (month < 0) {
                // If the month goes negative, adjust the year accordingly
                month += 12;
                year -= 1;
            }

            let monthlyExpense = 0;

            expenses.forEach((expense) => {
                const expenseDate = new Date(expense.date);
                if (
                    expenseDate.getFullYear() === year &&
                    expenseDate.getMonth() === month
                ) {
                    monthlyExpense += expense.amount;
                }
            });

            past6MonthsExpenses.push(monthlyExpense);
        }
        return past6MonthsExpenses;
    }

    // calculate expense by category for current month
    const totalExpenseByCategory = (expenseCategory) => {
        const totalExpenseByCategory = {};
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
      
        expenses.forEach((expense) => {
          const { category, amount, date } = expense;
          const expenseDate = new Date(date);
      
          if (
            category === expenseCategory &&
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
            ) {
            if (!totalExpenseByCategory[expenseCategory]) {
              totalExpenseByCategory[expenseCategory] = 0;
            }
            totalExpenseByCategory[expenseCategory] += amount;
          }
        });
      
        return totalExpenseByCategory[expenseCategory] || 0;
      };
    
    // calculate past average by category
    const calculatePastAverageByCategory = (expenseCategory) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // Filter expenses for the specified category
        const categoryExpenses = expenses.filter((expense) => expense.category === expenseCategory);
        
        // Group category expenses by year and month
        const expensesByMonth = {};
        categoryExpenses.forEach((expense) => {
            const expenseDate = new Date(expense.date);
            const year = expenseDate.getFullYear();
            const month = expenseDate.getMonth();
            const monthYearKey = `${year}-${month}`;
        
            if (!expensesByMonth[monthYearKey]) {
            expensesByMonth[monthYearKey] = [];
            }
        
            expensesByMonth[monthYearKey].push(expense.amount);
        });
        
        // Calculate past average for the category
        let total = 0;
        let numberOfMonths = 0;
        for (let year = currentYear; year >= currentYear - 1; year--) {
            for (let month = (year === currentYear ? currentMonth : 11); month >= 0; month--) {
            const monthYearKey = `${year}-${month}`;
            if (expensesByMonth[monthYearKey]) {
                total += expensesByMonth[monthYearKey].reduce((sum, amount) => sum + amount, 0);
                numberOfMonths++;
            }
            }
        }
        
        if (numberOfMonths === 0) {
            return 0; // No data available for past average
        }
        
        const pastAverage = total / numberOfMonths;
        return pastAverage;
    };
      


    return (
        <GlobalContext.Provider value={{
            loginUser,
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpense,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            monthlyExpenses,
            totalExpenseByCategory,
            calculatePastAverageByCategory
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)        // useContext function activates the context
}