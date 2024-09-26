import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    LineController,
    Title,
    Tooltip,
    Legend,
    plugins,
    Interaction
} from 'chart.js';

// Register necessary elements
ChartJS.register(LineElement, PointElement, LinearScale, LineController, Title, Tooltip, Legend);

// The Dashboaard displays key financial data and charts.
// Using Chart.js for simple data visualization


const Dashboard = () => {
    const [financialSummary, setFinancialSummary] = useState({ income: 0, expenses: 0});
    const [chartData, setChartData] = useState({});

      // Mock data for testing
    const mockData = {
        income: 5000,
        expenses: 3000,
        incomeHistory: [1000, 1200, 1500, 1800, 2000], // Sample data for income history
        expenseHistory: [800, 900, 950, 1100, 1200], // Sample data for expense history
    };

    useEffect(() => {
        //Fetch financial summary from backend
        /*axios.get('/api/financial-summary')
            .then(response => { */
                const { income, expenses, incomeHistory, expenseHistory } = mockData;

                if (incomeHistory && expenseHistory) {
                    setFinancialSummary({income, expenses});
                    setChartData({
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                        datasets: [
                            {
                                label: 'Income',
                                data: incomeHistory || [] ,
                                borderColor: 'green',
                                fill: false,
                                
                            },
                            {
                                label: 'Expenses',
                                data: expenseHistory || [],
                                borderColor: 'red',
                                fill: false,
                            }
                        ]
                    });

                } else {
                    console.error('Data format is not correct or incomplete');
                }

                
          /*  })
            .catch(error => {
                console.error('Error fetching financial summary:', error);
            });   */
    }, []);

    const chartOptiosn = {
        responsive : true,
        plugins: {
            tooltip: {
                enabled : true,
                mode: 'index',
                intersect: false,
                delay: 0
            }
        },
        Interaction: {
            mode: 'nearest',
            intersect: false
        },
        Animation: {
            duration: 0
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="summary">
                <h2>Income: {financialSummary.income}</h2>
                <h2>Expenses: {financialSummary.expenses}</h2>
            </div>
            <div className="chart">
                {/* Ensure chartData.datasets exist before rendering the chart */}
                {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
                    <Line data={chartData} options={chartOptiosn} />
                ) : (
                    <p>No chart data available.</p>
                )}
            </div>
        </div>

    );


};

export default Dashboard;