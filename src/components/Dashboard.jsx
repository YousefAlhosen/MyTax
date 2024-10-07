import React from "react";
import FinancialChart from "./FinancialChart";
import useDashboardData from "../hooks/useDashboardData";
import FinancialSummary from "./FinancialSummary";



// The Dashboaard displays key financial data and charts.
// Using Chart.js for simple data visualization


const Dashboard = () => {
    const { financialSummary, chartData, error, loading} = useDashboardData();

    return (
        <div>
            <h1>Dashboard</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <FinancialSummary income={financialSummary.income} expenses={financialSummary.expenses} />
            <FinancialChart chartData={chartData} />
        </div>
    );
};

export default Dashboard;