import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import "./InvoiceManagement.css";

// Display and manage invoices
// Integrate a button to handle MobilePay payments

const InvoiceManagement = () => {

    const { error, apiCall } = useApi([]);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await apiCall('/api/invoice');
                console.log("API Response:", response);
                setInvoices(response);
                console.log("Invoices fetched: ", response);
            } catch (err) {
                console.error("Error fetching invoices: ", err);

            }
        };

        fetchInvoices();
    }, [apiCall]);  

    const handleMobilePay = async (invoiceId) => {
        try {
            await apiCall(`/api/invoice/mobilepay/pay/${invoiceId}`, 'POST');
            alert('Payment initiated with MobilePay');
            // Refresh invoices after payment
            const updatedInvoices = await apiCall('/api/invoice');
            setInvoices(updatedInvoices);
        } catch (error) {
            console.error('Error with MobilePay', error);
            alert('Error with MobilePay payment');
        }
    };

    console.log('Invoices state:', invoices);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!Array.isArray(invoices) || invoices.length === 0) {
        return <div>No invoices available</div>;
    }

    return (
        <div>
          <h1>Invoice Management</h1>
          <div className="invoice-grid">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="invoice-card">
                <h3>{invoice.clientName}</h3>
                <p>
                  <strong>Amount:</strong> {invoice.amount}
                </p>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </p>
                {invoice.status === "Pending" && (
                  <button onClick={() => handleMobilePay(invoice.id)}>
                    Pay with MobilePay
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      );
};

export default InvoiceManagement;
