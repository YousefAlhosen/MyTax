import React, { useState, useCallback, useMemo } from "react";
import { useApiContext } from "../context/ApiContext";
import useTaxFilingForm from "../hooks/useTaxFilingForm";
import InputField from "./InputField";
import TaxFilingSummary from "./TaxFilingSummary";

// Using a form to input tax data and submit it to the backend

const TaxFiling = () => {
    const { error, loading, apiCall } = useApiContext();
    const [result, setResult] = useState(null);

    const initialState = useMemo(() => ({
        income: "",
        deductions: "",
        vat: "0.25",
        socialContributions: "",
    }), []);

    const { taxData, validationError, handleInputChange, validateInputs, setTaxData, setValidationError} = 
        useTaxFilingForm(initialState);


    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
        
            if (!validateInputs()) return;

            setValidationError({});

            try {
                const response = await apiCall('/api/taxfiling', 'POST', taxData);
                console.log("API Response:", response);

                if (response) {
                    setTaxData (initialState);
                    setResult(response);
                }
            } catch (error) {
                console.error("API call failed", error);
                setResult({ message: "Failed to fetch data."});
            }
        },
        [apiCall, taxData, validateInputs, initialState, setTaxData, setValidationError]
    );

    return (
        <div>
            <h1>Tax Filling</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    label= "Income:"
                    name= "income"
                    value={taxData.income}
                    onChange={handleInputChange}
                    error={validationError.income}
                />

                <InputField
                    label="Deductions:"
                    name="deductions"
                    value={taxData.deductions}
                    onChange={handleInputChange}
                    error={validationError.deductions}
                />

                <InputField
                    label="VAT:"
                    name="vat"
                    value={taxData.vat}
                    onChange={handleInputChange}
                />

                <InputField
                    label="Social Contributions:"
                    name="socialContributions"
                    value={taxData.socialContributions}
                    onChange={handleInputChange}
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Filing...' : 'File Tax'}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {result && <TaxFilingSummary result={result} />}
        </div>
    );
};

export default TaxFiling;