import React from "react";
import PropTypes from "prop-types";

const InvoiceCard = ({ invoice, onMobilePay }) => (
    <div className="invoice-card">
        <h3>{invoice.clientName}</h3>
        <p><strong>Amount:</strong> {invoice.amount}</p>
        <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
        <p>
            <strong>Status:</strong>
            <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                {invoice.status}
            </span>
        </p>
        {invoice.status === "Pending" && (
            <button onClick={() => onMobilePay(invoice.id)}>Pay with MobilePay</button>
        )}
    </div>
);

InvoiceCard.propTypes = {
    invoice: PropTypes.object.isRequired,
    onMobilePay: PropTypes.func.isRequired,
};

export default InvoiceCard;