import React, {useEffect, useState} from "react";
import { Line} from 'react-chartjs-2';
import useApi from "../hooks/useApi";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    LineController,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register necessary elements
ChartJS.register(LineElement, PointElement, LinearScale, LineController, Title, Tooltip, Legend);

// The Dashboaard displays key financial data and charts.
// Using Chart.js for simple data visualization


const Dashboard = () => {
    const {data, error, loading, apiCall} = useApi();
    const [financialSummary, setFinancialSummary] = useState({ income: null, expenses: null});
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchDashboardData = async () => {
            await apiCall('/api/dashboard');
        };
        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 10000);
        return () => clearInterval(interval)
    }, [apiCall]); 

    useEffect(() => {
        // If the data has been fetched, update the state
        if (data && Object.keys(data).length > 0 ){
            console.log('Fetched Data: ', data);
            const { income, expenses, incomeHistory, expenseHistory } = data;

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
        }
    }, [data]);  // update state when data changes

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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
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