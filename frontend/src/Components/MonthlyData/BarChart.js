import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useGlobalContext } from '../../Context/globalContext';
import styled from 'styled-components';

import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const ExpenseBarChart = () => {
  const { totalExpenseByCategory } = useGlobalContext();

  // Define your category labels (replace with your actual categories)
  const categoriesSpentThisMonth = [
    'dining',
    'groceries',
    'clothing',
    'education',
    'events',
    'health',
    'miscellaneous',
    'travelling',
  ];

  // Get the total expenses for each category this month
  const amountsSpentThisMonth = categoriesSpentThisMonth.map((category) =>
    totalExpenseByCategory(category)
  );

  const chartData = {
    labels: categoriesSpentThisMonth,
    datasets: [
      {
        label: 'Amount Spent This Month',
        data: amountsSpentThisMonth,
        backgroundColor: 'rgba(46,77,167, 0.4)',
        borderColor: 'rgba(46,77,167, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Disable responsive resizing
    maintainAspectRatio: false, // Disable maintaining aspect ratio
    scales: {
      x: {
        title: {
          display: true,
          text: 'Expense Categories',
          color: 'black',
          font: {
            size: 20,
          },
        },
        ticks: {
          color: 'black',
          font: {
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
          color: 'black',
          font: {
            size: 20,
          },
        },
        ticks: {
          color: 'black',
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'black',
          font: {
            size: 16,
          },
        },
      },
    },
    elements: {
      bar: {
        backgroundColor: 'rgba(46,77,167)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    },
  };

  return (
    <ExpenseBarChartStyled>
      <div style={{ margin: '0 90px' }}>
        <Bar data={chartData} options={chartOptions} width={800} height={400} />
      </div>
    </ExpenseBarChartStyled>
  );
};

const ExpenseBarChartStyled = styled.div`
  width: 100%;
`;

export default ExpenseBarChart;
