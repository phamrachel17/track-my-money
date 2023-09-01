import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/globalContext'
import { useAuthContext } from '../../Hooks/useAuthContext';

function MonthlyData() {
    const {monthlyExpenses, getIncomes, getExpense } = useGlobalContext()
    const user = useAuthContext();

    useEffect(() => {
        getIncomes(user.email)
        getExpense(user.email)
    }, [])

    // Calculate the current month's expense
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

const currentMonthExpense = monthlyExpenses().find((expense) => {
    const expenseDate = new Date(expense.date);
    return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
    );
});

    const monthLabels = Array.from({ length: 6 }, (_, i) => {
        const monthIndex = (currentMonth - i + 12) % 12;
        return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentDate.getFullYear(), monthIndex));
    });

    return (
        <MonthlyDataStyled>
            <h2 className="centered-header">You have spent:</h2>
            <div class="w-30">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '30%', height: '30%', marginLeft: '20%' }}>
                    <path fill="#DFB8C0" d="M40.9,-59.3C55.7,-54.1,72.2,-47.3,79,-35.3C85.8,-23.2,82.9,-5.8,79.2,10.5C75.5,26.8,70.9,42.2,61.3,52.8C51.6,63.5,36.9,69.5,21.4,75.1C5.9,80.7,-10.4,85.8,-24,81.8C-37.7,77.9,-48.6,64.7,-58.2,51.6C-67.8,38.4,-76,25.3,-76.6,11.8C-77.3,-1.6,-70.4,-15.3,-64.6,-30C-58.7,-44.8,-53.8,-60.5,-43.3,-67.5C-32.7,-74.6,-16.3,-72.9,-1.6,-70.3C13.1,-67.8,26.1,-64.4,40.9,-59.3Z" transform="translate(100 100)" />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="#000">
                        ${currentMonthExpense ? currentMonthExpense.amount.toFixed(2) : 'N/A'}
                    </text>
                </svg>
            </div>

            <div>
                {monthlyExpenses().map((expense, index) => (
                    <div key={index} className="history-item">
                        <p>{`${monthLabels[index]}: $${expense.toFixed(2)}`}</p>
                    </div>
                ))}
            </div>
        </MonthlyDataStyled>
    )
}

const MonthlyDataStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .centered-header {
        text-align: center; 
        margin-top: 30px; 
    }
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default MonthlyData