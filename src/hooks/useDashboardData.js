import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const useDashboardData = () => {
    const { data, error, loading, apiCall } = useApi();
    const [financialSummary, setFinancialSummary] = useState({ income: null, expenses: null });
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchDashboardData = async () => {
            await apiCall('/api/dashboard');
        };
        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 1000);
        return () => clearInterval(interval);
    }, [apiCall]);

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            const { income, expenses, incomeHistory, expenseHistory } = data;
            setFinancialSummary({ income, expenses });
            setChartData({
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [
                    {
                        label: 'Income',
                        data: incomeHistory || [],
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
        }
    }, [data]);

    return { financialSummary, chartData, error, loading };
};

export default useDashboardData;
