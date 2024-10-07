import { useEffect, useCallback } from "react";
import useApi from "./useApi";

const useReports = () => {
    const { data = [], error, loading, apiCall } = useApi([]);
    
    const fetchReports = useCallback(async () => {
        const data = await apiCall('/api/report');
        console.log(data);
    }, [apiCall]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    return { data, error, loading };
};

export default useReports;