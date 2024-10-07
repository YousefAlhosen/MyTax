import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


const chartOptions = {
    responsive: true,
    plugins: {
        tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            delay: 0,
        }
    },
    interaction: {
        mode: 'nearest',
        intersect: false,
    },
    animation: {
        duration: 0,
    }
};

const FinancialChart = ({ chartData }) => (
    <div className="chart">
        {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
        ) : (
            <p>No chart data available.</p>
        )}
    </div>
);

export default FinancialChart;