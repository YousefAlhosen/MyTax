import { useState } from "react";

const useTaxFilingForm = (initialState) => {
    const [taxData, setTaxData] = useState(initialState);
    const [validationError, setValidationError] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTaxData((prevData) => ({ ...prevData, [name]: value}));
    };

    const validateInputs = () => {
        const errors = {};
    
        if (!taxData.income || isNaN(taxData.income) || parseFloat(taxData.income) <= 0) {
          errors.income = "Income must be a valid number and greater than zero.";
        }
    
        if (!taxData.deductions || isNaN(taxData.deductions)) {
          errors.deductions = "Deductions must be a valid number.";
        }
    
        setValidationError(errors);
        return Object.keys(errors).length === 0;
    };

    return {
        taxData,
        validationError,
        handleInputChange,
        validateInputs,
        setTaxData,
        setValidationError,
    };

};

export default useTaxFilingForm;