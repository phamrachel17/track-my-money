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
        console.log(past6MonthsExpenses)
        return past6MonthsExpenses;
    };

    // // monthly data calculations
    // const monthlyExpense = () => {
    //     let monthlyExpense = 0;
    //     const currentDate = new Date();
    //     expenses.forEach((expense) => {
    //         const expenseDate = new Date(expense.date)
    //         if (
    //             expenseDate.getMonth() == currentDate.getMonth () &&
    //             expenseDate.getFullYear() == currentDate.getFullYear()
    //         ) {
    //             monthlyExpense += expense.amount;
    //         }
    //     })
    //     return monthlyExpense;
    // }


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
            monthlyExpenses
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)        // useContext function activates the context
}