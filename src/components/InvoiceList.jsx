import React from "react";
import InvoiceCard from "./InvoiceCard";
import PropTypes from "prop-types";

const InvoiceList = ({ invoices, onMobilePay }) => (
    <div className="invoice-grid">
        {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} onMobilePay={onMobilePay} />
        ))}
    </div>
);

InvoiceList.propTypes = {
    invoices: PropTypes.array.isRequired,
    onMobilePay: PropTypes.func.isRequired,
};

export default InvoiceList;