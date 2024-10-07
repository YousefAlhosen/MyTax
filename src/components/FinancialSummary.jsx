import React from "react";

const FinancialSummary = ({ income, expenses }) => (
    <div className="summary">
        <h2>Income: {income !== null ? income : "N/A"}</h2>
        <h2>Expenses: {expenses !== null ? expenses : "N/A"}</h2>
    </div>
);

export default FinancialSummary;