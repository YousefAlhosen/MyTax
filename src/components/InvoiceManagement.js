import React, {useState, useEffect} from "react";
import axios from 'axios';
import useApi from "../hooks/useApi";

// Display and manage invoices.
// Integrate a button to handle MobilePay payments
const mockInvoices = [
    { id: 1, clientName: "Client A", amount: 100, dueDate: "2024-09-30", status: "Pending" },
    { id: 2, clientName: "Client B", amount: 200, dueDate: "2024-10-15", status: "Paid" },
];


const InvoiceManagement = () => {

    //const { data: invoices, loading, error} = useApi('/api/invoices');

    const [invoices, setInvoices] = useState(mockInvoices);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Simulate loading state
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setInvoices(mockInvoices);
            setLoading(false);
        }, 1000);
    }, []);

    const handleMobilePay = async (invoiceId) => {
        try{
            //Trigger MobilePay API for payment
            await axios.post(`/api/mobilepay/pay/${invoiceId}`);
            alert('Payment initiated with MobilePay');

        } catch (error) {
            console.error('Error with MobilPay', error);
            alert('Error with MobilePay payment');
        } 
    };

    if (loading) {
        return <div> Loading invoices... </div>
    }

    if (error) {
        return <div> Error : {error}</div>
    }

    if (!Array.isArray(mockInvoices)) {
        return <div> Unexpected response format.</div>
    }

    return (
        <div>
            <h1>Invoice Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>DueDate</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mockInvoices.length > 0 ? (
                        mockInvoices.map(invoice => (
                            <tr key={invoice.id}>
                                <td>{invoice.clientName}</td>
                                <td>{invoice.amount}</td>
                                <td>{invoice.dueDate}</td>
                                <td>{invoice.status}</td>
                                <td>
                                    {invoice.status === 'Pending' && 
                                        <button onClick={() => handleMobilePay(invoice.id)}> 
                                            Pay with MobilePay
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No invoices available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceManagement;