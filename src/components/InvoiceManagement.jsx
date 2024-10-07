import React from "react";
import useInvoices from "../hooks/useInvoices";
import InvoiceList from "./InvoiceList";
import "../styles/InvoiceManagement.css";
import useApi from "../hooks/useApi";

// Display and manage invoices
// Integrate a button to handle MobilePay payments

const InvoiceManagement = () => {

  const { invoices, error, fetchInvoices } = useInvoices(); 
  const { apiCall } = useApi();

  const handleMobilePay = async (invoiceId) => {
    try {
        await apiCall(`/api/invoice/mobilepay/pay/${invoiceId}`, 'POST');
        alert('Payment initiated with MobilePay');
        // Refresh invoices after payment
        fetchInvoices();
    } catch (error) {
        console.error('Error with MobilePay', error);
        alert('Error with MobilePay payment');
    }
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(invoices) || invoices.length === 0) {
    return <div>No invoices available</div>;
  }

  return (
    <div>
        <h1>Invoice Management</h1>
        <InvoiceList invoices={invoices} onMobilePay={handleMobilePay} />
    </div>
          
  );
};

export default InvoiceManagement;
