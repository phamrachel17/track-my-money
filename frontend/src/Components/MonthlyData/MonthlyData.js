import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/globalContext'
import { useAuthContext } from '../../Hooks/useAuthContext';
import Table from 'react-bootstrap/Table';
import BarChart from './BarChart';

function MonthlyData() {
    const {monthlyExpenses, getIncomes, getExpense, totalExpenseByCategory, calculatePastAverageByCategory } = useGlobalContext()
    const user = useAuthContext();

    useEffect(() => {
        getIncomes(user.email)
        getExpense(user.email)
    }, [])

    // Calculate the current month's expense
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthLabels = Array.from({ length: 6 }, (_, i) => {
        const monthIndex = (currentMonth - i + 12) % 12;
        return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentDate.getFullYear(), monthIndex));
    });

    return (
        <MonthlyDataStyled>
            <h2 style={{ textAlign: 'left', marginLeft: '150px', marginTop: '30px' }}>You have spent:</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '25%', height: '25%', marginLeft: '1.5%', marginRight: '1%' }}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#DFB8C0" d="M40.9,-59.3C55.7,-54.1,72.2,-47.3,79,-35.3C85.8,-23.2,82.9,-5.8,79.2,10.5C75.5,26.8,70.9,42.2,61.3,52.8C51.6,63.5,36.9,69.5,21.4,75.1C5.9,80.7,-10.4,85.8,-24,81.8C-37.7,77.9,-48.6,64.7,-58.2,51.6C-67.8,38.4,-76,25.3,-76.6,11.8C-77.3,-1.6,-70.4,-15.3,-64.6,-30C-58.7,-44.8,-53.8,-60.5,-43.3,-67.5C-32.7,-74.6,-16.3,-72.9,-1.6,-70.3C13.1,-67.8,26.1,-64.4,40.9,-59.3Z" transform="translate(100 100)" />
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#fff">
                                <tspan x="50%" dy="-0.03em" fontSize="30">{`$${monthlyExpenses()[0].toFixed(2)}`}</tspan>
                                <tspan x="50%" dy="2em" fontSize="12">this month</tspan>
                            </text>
                        </svg>
                        </div>
                <BarChart /> 
            </div>
            
            {/* Category Tables */}
            <Table bordered style={{width: '92%', margin:'0 auto', borderRadius: '10px', overflow: 'hidden'}}>
            <thead>
                <tr>
                    <th colSpan="4" style={{ backgroundColor: 'rgba(75,104,184, 0.2)' }}>Dining</th>
                </tr>
                <tr>
                    <th>Past Average</th>
                    <th>This Month</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{`$${calculatePastAverageByCategory('dining')}`}</td>
                    <td>{`$${totalExpenseByCategory('dining')}`}</td>
                    </tr>
                </tbody>
            </Table>

            <Table bordered style={{width: '92%', margin:'0 auto', borderRadius: '10px', overflow: 'hidden'}}>
            <thead>
                <tr> 
                    <th className="left-margin" colSpan="4" style={{ backgroundColor: 'rgba(75,104,184, 0.2)' }}>Groceries</th>
                </tr>
                <tr>
                    <th >Past Average</th>
                    <th>This Month</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{`$${calculatePastAverageByCategory('groceries')}`}</td>
                    <td>{`$${totalExpenseByCategory('groceries')}`}</td>
                    </tr>
                </tbody>
            </Table>

            <Table bordered style={{width: '92%', margin:'0 auto', borderRadius: '10px', overflow: 'hidden'}}>
            <thead>
                <tr>
                    <th colSpan="4" style={{ backgroundColor: 'rgba(75,104,184, 0.2)' }}>Clothing</th>
                </tr>
                <tr>
                    <th>Past Average</th>
                    <th>This Month</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{`$${calculatePastAverageByCategory('clothing')}`}</td>
                    <td>{`$${totalExpenseByCategory('clothing')}`}</td>
                    </tr>
                </tbody>
            </Table>

            <Table bordered style={{width: '92%', margin:'0 auto', borderRadius: '10px', overflow: 'hidden'}}>
            <thead>
                <tr>
                    <th colSpan="4" style={{ backgroundColor: 'rgba(75,104,184, 0.2)' }}>Education</th>
                </tr>
                <tr>
                    <th>Past Average</th>
                    <th>This Month</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{`$${calculatePastAverageByCategory('education')}`}</td>
                    <td>{`$${totalExpenseByCategory('education')}`}</td>
                    </tr>
                </tbody>
            </Table>

            <Table bordered style={{width: '92%', margin:'0 auto', borderRadius: '10px', overflow: 'hidden'}}>
            <thead>
                <tr>
                    <th colSpan="4" style={{ backgroundColor: 'rgba(75,104,184, 0.2)' }}>Events</th>
                </tr>
                <tr>
                    <th>Past Average</th>
                    <th>This Month</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{`$${calculatePastAverageByCategory('events')}`}</td>
                    <td>{`$${totalExpenseByCategory('events')}`}</td>
                    </tr>
                </tbody>
            </Table>

            <Table bordered style={{width: '92%', margin:'0 auto', borderRadius: '10px', overflow: 'hidden'}}>
            <thead>
                <tr>
                    <th colSpan="4" style={{ backgroundColor: 'rgba(75,104,184, 0.2)' }}>Health</th>
                </tr>
                <tr>
                    <th>Past Average</th>
                    <th>This Month</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{`$${calculatePastAverageByCategory('health')}`}</td>
                    <td>{`$${totalExpenseByCategory('health')}`}</td>
                    </tr>
                </tbody>
            </Table>

            <Table bordered style={{width: '92%', margin:'0 auto', borderRadius: '10px', overflow: 'hidden'}}>
            <thead>
                <tr>
                    <th colSpan="4" style={{ backgroundColor: 'rgba(75,104,184, 0.2)' }}>Miscellaneous</th>
                </tr>
                <tr>
                    <th>Past Average</th>
                    <th>This Month</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{`$${calculatePastAverageByCategory('miscellaneous')}`}</td>
                    <td>{`$${totalExpenseByCategory('miscellaneous')}`}</td>
                    </tr>
                </tbody>
            </Table>

            <Table bordered style={{width: '92%', margin:'0 auto', borderRadius: '10px', overflow: 'hidden'}}>
            <thead>
                <tr>
                    <th colSpan="4" style={{ backgroundColor: 'rgba(75,104,184, 0.2)' }}>Travelling</th>
                </tr>
                <tr>
                    <th>Past Average</th>
                    <th>This Month</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{`$${calculatePastAverageByCategory('travelling')}`}</td>
                    <td>{`$${totalExpenseByCategory('travelling')}`}</td>
                    </tr>
                </tbody>
            </Table>

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
    .left-margin {
        margin-left: 10px; /* Adjust the margin as needed */
      }
`;

export default MonthlyData