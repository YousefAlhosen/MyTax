import { Box, CircularProgress, Typography } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import useReports from '../hooks/useReports';
import ReportTable from './ReportTable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Reports = () => {
    const { data: reportData = [], error: apiError, loading: apiLoading } = useReports();
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState('month');

    console.log("Report data in Reports", reportData);

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortColumn(column);
    };

    const sortedData = useMemo(() => {
        const monthOrder = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return [...reportData].sort((a, b) => {
            if (sortColumn === 'month') {
                return sortDirection === 'asc'
                    ? monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
                    : monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
            }
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }, [reportData, sortColumn, sortDirection]);

    const memoizedChartData = useMemo(() => {
        if (Array.isArray(reportData) && reportData.length > 0) {
            const labels = reportData.map(report => report.month);
            const datasets = [
                { label: 'Revenue', data: reportData.map(r => r.revenue), backgroundColor: 'rgba(75, 192, 192, 0.6)' },
                { label: 'Expenses', data: reportData.map(r => r.expenses), backgroundColor: 'rgba(255, 99, 132, 0.6)' },
                { label: 'Profit', data: reportData.map(r => r.profit), backgroundColor: 'rgba(54, 162, 235, 0.6)' },
            ];
            console.log({ labels, datasets});

            return {labels, datasets};
        }
        return null;
    }, [reportData]);

    if (apiLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (apiError) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant='h6' color='error'>{apiError}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom> Financial Reports </Typography>
            <ReportTable data={sortedData} sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
            <Typography variant='h6' gutterBottom> Monthly Financial Summary</Typography>
            {memoizedChartData ? <Bar data={memoizedChartData} /> :
                <Typography variant='body1' color='textSecondary'> No Data available to display. </Typography>}

        </Box>

    );
};

export default Reports;