import { useState } from "react";
import axios from 'axios';

const useApi = (initialState = {}) => {
    const [data, setData] = useState(initialState);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiCall = async (url, method = 'GET', payload = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios ({ url, method, data: payload});
            setData(response.data);
        } catch (err) {
            setError(err.message  || 'An error occurred' );
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, apiCall};

};

export default useApi;