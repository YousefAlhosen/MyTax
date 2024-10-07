import  { useEffect, useState, useCallback } from "react";
import useApi from "./useApi";

const useInvoices = () => {
    const { error, apiCall } = useApi();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchInvoices = useCallback( async () => {
        setLoading(true);
        try {
            const response = await apiCall('/api/invoice');
            setInvoices(response);
        } catch (err) {
            console.error("Error fetching invoices: ", err);
        } finally {
            setLoading(false);
        }
    }, [apiCall]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    return { invoices, error, loading, fetchInvoices };
};

export default useInvoices;