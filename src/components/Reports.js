import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Bar} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
//import { useApiContext } from '../context/ApiContext';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const mockReportData = [
    { month: 'January', revenue: 12000, expenses: 8000, profit: 4000 },
    { month: 'February', revenue: 15000, expenses: 9000, profit: 6000 },
    { month: 'March', revenue: 18000, expenses: 10000, profit: 8000 },
    { month: 'April', revenue: 20000, expenses: 11000, profit: 9000 },
    { month: 'May', revenue: 25000, expenses: 12000, profit: 13000 },
    { month: 'June', revenue: 28000, expenses: 15000, profit: 13000 },
    { month: 'July', revenue: 30000, expenses: 17000, profit: 13000 },
    { month: 'August', revenue: 32000, expenses: 18000, profit: 14000 },
    // Add more mock data as needed
];

const Reports = () => {
    //const { data:reportData = [], error: apiError, loading: apiLoading} = useApiContext();
    const [reportData, setReportData] = useState(mockReportData);
    const [chartData, setChartData] = useState({labels: [], datasets: []});

    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState('month');

    useEffect(() => {
        if(Array.isArray(reportData) && reportData.length > 0) {
            const labels = reportData.map(report => report.month);
            const revenueData = reportData.map(report => report.revenue);
            const expensesData = reportData.map(report => report.expenses);
            const profitData = reportData.map(report => report.profit);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: revenueData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                    {
                        label: 'Expenses',
                        data: expensesData,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    },
                    {
                        label: 'Profit',
                        data: profitData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    },
                ],
            });
        }
    }, [reportData]);

   /* if (apiLoading) {
        // show loading spinner while data is being fetched
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress />
            </Box>
        );
    }

    if (apiError) {
        // Display error message if the API call fails
        return (
            <Box sx={{ p:3, textAlign: 'center'}}>
                <Typography variant='h6' color='error'>{apiError}</Typography>
            </Box>
        )
    }

    */

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc' );
        setSortColumn(column);
    };

    const monthOrder = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const sortedData = [...reportData].sort((a, b) => {
        if (sortColumn === 'month') {
            return sortDirection === 'asc'
               ? monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
               : monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
        }
        const aValue = sortColumn === 'revenue' ? a.revenue : sortColumn === 'expenses' ? a.expenses: a.profit;
        const bValue = sortColumn === 'revenue' ? b.revenue : sortColumn === 'expenses' ? b.expenses : b.profit;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return(
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Financial Reports
            </Typography>

            {/* Material-UI Table for displaying financial data */}
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => handleSort('month')} style={{ cursor: 'pointer'}}>
                                Month {sortColumn === 'month' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort('revenue')} style={{ cursor: 'pointer'}}>
                                Revenue {sortColumn === 'revenue' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort('expenses')} style={{ cursor: 'pointer'}}>
                                Expenses {sortColumn === 'expenses' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort('profit')} style={{ cursor: 'pointer'}}>
                                Profit {sortColumn === 'profit' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row) => (
                            <TableRow key={row.month}>
                                <TableCell>{row.month}</TableCell>
                                <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                                <TableCell align="right">${row.expenses.toLocaleString()}</TableCell>
                                <TableCell align="right">${row.profit.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Bar Chart for revenue, expenses, and profit */}
            <Typography variant="h6" gutterBottom>
                Monthly Financial Summary
            </Typography>
            <Bar data={chartData} />
        </Box>
    );
    
};

export default Reports;
