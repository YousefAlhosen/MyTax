import React, { useState } from "react";
import { useApiContext } from "../context/ApiContext";

// Using a form to input tax data and submit it to the backend

const TaxFiling = () => {
    const { error, loading, apiCall } = useApiContext();
    const [taxData, setTaxData] = useState({
        income: '',
        deductions: '',
    });


    const handleInputChanege = (event) => {
        const { name, value } = event.target;
        setTaxData({ ...taxData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Submit tax data to backend
        await apiCall('/api/tax-filing', 'POST', taxData);
        if (!error) {
            alert('Tax filed successfully');
        }

    };

    return (
        <div>
            <h1>Tax Filling</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <lable>Income:</lable>
                    <input
                        type="number"
                        name="income"
                        value={taxData.income}
                        onChange={handleInputChanege}
                    />
                </div>
                <div>
                    <label>Deductions</label>
                    <input
                        type="number"
                        name="deductions"
                        value={taxData.deductions}
                        onChange={handleInputChanege}
                    />
                </div>
                <button type="submit" disabled={loading}>File Tax</button>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default TaxFiling;