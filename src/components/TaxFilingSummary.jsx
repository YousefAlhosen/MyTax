import React from "react";

const TaxFilingSummary = ({ result }) => (
  <div>
    <h2>Tax Filing Summary</h2>
    <p>Message: {result.message || "No message available"}</p>
    <p>Total Tax: {result.totalTax !== undefined ? result.totalTax : "N/A"}</p>
    <p>VAT Amount: {result.vatAmount !== undefined ? result.vatAmount : "N/A"}</p>
    <p>Corporate Tax: {result.corporateTax !== undefined ? result.corporateTax : "N/A"}</p>
  </div>
);

export default TaxFilingSummary;